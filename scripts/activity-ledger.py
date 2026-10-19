#!/usr/bin/env python3
"""Private, local-only research ledger. Python standard library; never writes public copy."""
import argparse
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import re
import sqlite3
import subprocess
import sys
import tarfile
import unicodedata

KST = dt.timezone(dt.timedelta(hours=9))
SCHEMA_VERSION = 1
REPO_ROOT = Path(__file__).resolve().parents[1]
REPO_ALIASES = {name: 'peoplefund-tech/' + name for name in
                ('pfct-admin', 'pfct-gaia', 'product-realm', 'monitoring', 'lily-apps')}
# Only explicit identifiers, not fuzzy title matching or inferred authorship.
FACT_ALIASES = {'owner-direct-correction-2026-10-18-2157': 'ax-presentation'}
SECRET = re.compile(r'(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|'
                    r'sk-(?:proj-)?[A-Za-z0-9_-]{32,}|AKIA[A-Z0-9]{16}|'
                    r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|'
                    r'eyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,})')


def now():
    return dt.datetime.now(KST).isoformat()


def dump(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True)


def digest(value):
    return hashlib.sha256(value).hexdigest()


def private_path(path):
    path = Path(path).expanduser().resolve()
    if path == REPO_ROOT or REPO_ROOT in path.parents:
        raise ValueError('private storage must be outside the public repository')
    return path


def home():
    return private_path(os.environ.get('JEAMXN_ACTIVITY_HOME',
                        '~/.local/share/jeamxn/activity-ledger'))


def secure_dir(path):
    if path.is_symlink():
        raise ValueError('private storage directory may not be a symlink')
    path.mkdir(parents=True, exist_ok=True)
    path.chmod(0o700)


def db_open():
    os.umask(0o077)
    root = home()
    for name in ('', 'sources', 'backups'):
        secure_dir(root / name)
    if (root / 'ledger.sqlite3').is_symlink():
        raise ValueError('database may not be a symlink')
    con = sqlite3.connect(root / 'ledger.sqlite3')
    (root / 'ledger.sqlite3').chmod(0o600)
    con.row_factory = sqlite3.Row
    con.execute('PRAGMA foreign_keys=ON')
    con.executescript('''
    CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY,value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sources(
      id TEXT PRIMARY KEY, sha256 TEXT UNIQUE NOT NULL, original_name TEXT NOT NULL,
      stored_name TEXT NOT NULL, kind TEXT NOT NULL, imported_at TEXT NOT NULL,
      source_as_of TEXT, coverage TEXT NOT NULL DEFAULT 'partial');
    CREATE TABLE IF NOT EXISTS activities(
      id TEXT PRIMARY KEY, kind TEXT NOT NULL, project_key TEXT, title TEXT,
      public_snapshot_json TEXT, research_json TEXT, user_notes TEXT NOT NULL DEFAULT '',
      review_state TEXT NOT NULL, updated_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS evidence(
      id TEXT PRIMARY KEY, repo TEXT, sha TEXT, observed_date TEXT,
      review_state TEXT NOT NULL DEFAULT 'research_candidate',
      user_notes TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL);
    CREATE UNIQUE INDEX IF NOT EXISTS evidence_git ON evidence(repo,sha) WHERE sha IS NOT NULL;
    CREATE TABLE IF NOT EXISTS evidence_sources(
      evidence_id TEXT REFERENCES evidence(id), source_id TEXT REFERENCES sources(id),
      record_key TEXT NOT NULL, payload_json TEXT NOT NULL,
      PRIMARY KEY(evidence_id,source_id,record_key));
    CREATE TABLE IF NOT EXISTS activity_evidence(
      activity_id TEXT REFERENCES activities(id), evidence_id TEXT REFERENCES evidence(id),
      section_id TEXT NOT NULL DEFAULT '', source_id TEXT REFERENCES sources(id),
      PRIMARY KEY(activity_id,evidence_id,section_id,source_id));
    CREATE TABLE IF NOT EXISTS source_records(
      source_id TEXT REFERENCES sources(id), record_key TEXT NOT NULL,
      activity_id TEXT REFERENCES activities(id), payload_json TEXT NOT NULL,
      mapping_status TEXT NOT NULL, PRIMARY KEY(source_id,record_key));
    CREATE TABLE IF NOT EXISTS checkpoints(
      repo TEXT NOT NULL, ref TEXT NOT NULL, author_scope TEXT NOT NULL DEFAULT 'all',
      sha TEXT, examined_at TEXT NOT NULL, coverage TEXT NOT NULL CHECK(coverage IN ('partial','full')),
      note TEXT NOT NULL, source_id TEXT REFERENCES sources(id),
      PRIMARY KEY(repo,ref,author_scope));
    ''')
    version = con.execute("SELECT value FROM metadata WHERE key='schema_version'").fetchone()
    if version and int(version[0]) != SCHEMA_VERSION:
        raise ValueError('unsupported ledger schema version')
    con.execute("INSERT OR IGNORE INTO metadata VALUES('schema_version',?)", (str(SCHEMA_VERSION),))
    con.commit()
    return con


def counts(con):
    tables = ('activities', 'evidence', 'sources', 'activity_evidence', 'source_records', 'checkpoints')
    return {table: con.execute('SELECT count(*) FROM ' + table).fetchone()[0] for table in tables}


def status(con):
    result = counts(con)
    result.update(home=str(home()), schemaVersion=SCHEMA_VERSION, checkpointCount=result['checkpoints'],
                  integrity=con.execute('PRAGMA integrity_check').fetchone()[0],
                  unmapped=con.execute("SELECT count(*) FROM source_records WHERE mapping_status='unmapped'").fetchone()[0],
                  reviewStates={r[0]: r[1] for r in con.execute('SELECT review_state,count(*) FROM activities GROUP BY review_state')},
                  checkpoints=[dict(r) for r in con.execute('SELECT * FROM checkpoints ORDER BY repo,ref')])
    return result


def repo_name(name):
    return REPO_ALIASES.get(name, name)


def record(con, sid, key, payload, aid=None, mapped='unmapped'):
    con.execute('INSERT OR IGNORE INTO source_records VALUES(?,?,?,?,?)',
                (sid, key, aid, dump(payload), mapped))


def activity(con, aid, kind, key, title, payload, public=False):
    # Imported snapshots are distinct from user_notes/review_state, which are never overwritten.
    con.execute('''INSERT INTO activities(id,kind,project_key,title,public_snapshot_json,
                research_json,review_state,updated_at) VALUES(?,?,?,?,?,?,?,?)
                ON CONFLICT(id) DO UPDATE SET title=excluded.title,
                public_snapshot_json=COALESCE(excluded.public_snapshot_json,activities.public_snapshot_json),
                research_json=COALESCE(excluded.research_json,activities.research_json),updated_at=excluded.updated_at''',
                (aid, kind, key, title, dump(payload) if public else None,
                 None if public else dump(payload), 'curated_snapshot' if public else 'research_candidate', now()))


def public_activity(con, key):
    rows = con.execute('SELECT id FROM activities WHERE project_key=? AND public_snapshot_json IS NOT NULL', (key,)).fetchall()
    return rows[0][0] if len(rows) == 1 else None


def portfolio_import(con, data, sid, missing_only=False):
    if not isinstance(data, dict) or not isinstance(data.get('projects'), list):
        raise ValueError('portfolio requires projects array')
    for group, prefix in [('projects', 'project'), ('activities', 'activity')]:
        for i, item in enumerate(data.get(group, [])):
            key = item.get('slug')
            if not key:
                if prefix != 'activity':
                    record(con, sid, group + ':' + str(i), item)
                    continue
                identity = [unicodedata.normalize('NFKC', re.sub(r'\s+', ' ', str(item.get(field, '')).strip())).casefold()
                            for field in ('title', 'organization', 'period')]
                key = 'identity-' + digest(dump(identity).encode())[:20]
            aid = prefix + ':' + key
            if missing_only and con.execute('SELECT 1 FROM activities WHERE id=?', (aid,)).fetchone():
                continue
            activity(con, aid, prefix, key, item.get('name', item.get('title')), item, public=True)
            rkey = group + ':' + (item.get('slug') or str(i))
            mapping = 'exact-public-slug' if item.get('slug') else 'stable-activity-identity'
            record(con, sid, rkey, item, aid, mapping)
            if not item.get('slug'):
                con.execute('UPDATE source_records SET activity_id=?,mapping_status=? WHERE source_id=? AND record_key=?',
                            (aid, mapping, sid, rkey))
    # Profile/experience/education/awards are losslessly retained, not counted as products.
    for key in data.keys() - {'projects', 'activities'}:
        record(con, sid, key, data[key], mapped='source-only')


def insert_evidence(con, item, sid, key):
    sha = item.get('sha', item.get('commitSha'))
    repo = repo_name(item.get('repo', ''))
    if sha:
        if not re.fullmatch(r'[0-9a-fA-F]{40}', sha) or not repo:
            raise ValueError('commit evidence requires repository and full 40-character SHA')
        sha = sha.lower()
        eid = 'git:' + repo + ':' + sha
    else:
        eid = 'fact:' + sid + ':' + key
    con.execute('INSERT OR IGNORE INTO evidence(id,repo,sha,observed_date,updated_at) VALUES(?,?,?,?,?)',
                (eid, repo or None, sha, item.get('date', item.get('observedDate')), now()))
    con.execute('INSERT OR IGNORE INTO evidence_sources VALUES(?,?,?,?)', (eid, sid, key, dump(item)))
    record(con, sid, key, item, mapped='evidence-only')
    if sha and item.get('ref'):
        # A selected patch/ref observation MUST NOT advance a complete review cursor.
        con.execute('''INSERT OR IGNORE INTO checkpoints VALUES(?,?,?,?,?,?,?,?)''',
                    (repo, item['ref'], 'all', item.get('refSha'), now(), 'partial',
                     'Selected source observation only; not continuous review coverage', sid))
    return eid


def evidence_import(con, data, sid):
    items = data if isinstance(data, list) else data.get('entries', data.get('items', []))
    if not isinstance(items, list):
        raise ValueError('evidence requires entries/items array')
    for i, item in enumerate(items):
        insert_evidence(con, item, sid, item.get('id', str(i)))
    if isinstance(data, dict):
        for i, item in enumerate(data.get('nonCodeFacts', [])):
            insert_evidence(con, item, sid, item.get('id', 'fact-' + str(i)))
        record(con, sid, '_document_context', {k: v for k, v in data.items() if k not in ('entries', 'items', 'nonCodeFacts')}, mapped='source-only')


def source_map_import(con, data, sid):
    mapping = data.get('draftSourceMap', {})
    for target, refs in mapping.items():
        project, _, section = target.partition(':')
        aid = public_activity(con, project)
        linked = 0
        missing = []
        for ref in refs:
            ref = FACT_ALIASES.get(ref, ref)
            rows = con.execute('SELECT DISTINCT evidence_id FROM evidence_sources WHERE record_key=?', (ref,)).fetchall()
            if aid and rows:
                for row in rows:
                    con.execute('INSERT OR IGNORE INTO activity_evidence VALUES(?,?,?,?)', (aid, row[0], section, sid))
                    linked += 1
            else:
                missing.append(ref)
        record(con, sid, target, {'sourceRefs': refs, 'linked': linked, 'missing': missing}, aid,
               'exact-key' if linked and not missing else 'unmapped')
    for mapping in data.get('inventoryProjectMap', []):
        key = mapping['projectKey']
        slug = mapping.get('publicSlug')
        aid = public_activity(con, slug) if slug else None
        source_id = mapping['inventorySourceId']
        original = con.execute('''SELECT record_key,activity_id FROM source_records
                                 WHERE source_id=? AND activity_id=?''',
                               (source_id, 'inventory:' + key)).fetchone()
        linked = 0
        if aid and original:
            refs = con.execute('''SELECT DISTINCT es.evidence_id FROM evidence_sources es
                                  WHERE es.source_id=? AND substr(es.record_key,1,length(?))=?''',
                               (source_id, original['record_key'] + ':evidence:',
                                original['record_key'] + ':evidence:')).fetchall()
            for row in refs:
                con.execute('INSERT OR IGNORE INTO activity_evidence VALUES(?,?,?,?)',
                            (aid, row[0], 'inventory:' + key, sid))
                linked += 1
            # Preserve original inventory activity_id/row and payload; mark explicit linkage only.
            con.execute('''UPDATE source_records SET mapping_status='explicit-project-map'
                           WHERE source_id=? AND record_key=?''', (source_id, original['record_key']))
        record(con, sid, 'inventory-map:' + key,
               dict(mapping, evidenceLinks=linked), aid,
               'explicit-project-map' if aid and original else 'unmapped')
    record(con, sid, '_document_context', {k:v for k,v in data.items()
           if k not in ('draftSourceMap', 'inventoryProjectMap')}, mapped='source-only')


def reference_evidence(con, item, sid, record_key):
    """Structured historical reference; an abbreviated Git id is NEVER a full commit."""
    identity = {k: item[k] for k in ('type', 'id', 'url', 'source') if k in item}
    eid = 'ref:' + digest(dump(identity if identity else item).encode())
    url = item.get('url') or ''
    match = re.match(r'https://github\.com/([^/]+/[^/]+)(?:/|$)', url)
    repo = match[1] if match else None
    con.execute('INSERT OR IGNORE INTO evidence(id,repo,observed_date,updated_at) VALUES(?,?,?,?)',
                (eid, repo, item.get('date'), now()))
    con.execute('INSERT OR IGNORE INTO evidence_sources VALUES(?,?,?,?)', (eid, sid, record_key, dump(item)))
    return eid


def inventory_import(con, data, sid):
    # Adapter for the actual consolidated audit: workGroups, not public projects.
    if isinstance(data, list):
        items = data
    else:
        items = next((data[k] for k in ('workGroups', 'projects', 'projectList', 'catalog', 'items')
                      if isinstance(data.get(k), list)), None)
    if items is None:
        raise ValueError('inventory requires workGroups/projects/projectList/catalog/items array')
    for i, item in enumerate(items):
        key = item.get('projectKey', item.get('slug'))
        aid = public_activity(con, key) if key else None
        if key and not aid:
            aid = 'inventory:' + key
            activity(con, aid, 'inventory', key, item.get('name', item.get('title', key)), item)
            mapped = 'unmapped'
        else:
            mapped = 'exact-public-slug' if aid else 'unmapped'
        record_key = str(i) + ':' + str(key or 'unknown')
        record(con, sid, record_key, item, aid, mapped)
        for j, evidence in enumerate(item.get('evidence', [])):
            if not isinstance(evidence, dict):
                continue
            eid = reference_evidence(con, evidence, sid, record_key + ':evidence:' + str(j))
            if aid:
                con.execute('INSERT OR IGNORE INTO activity_evidence VALUES(?,?,?,?)', (aid, eid, '', sid))
    if isinstance(data, dict):
        # Ancillary catalogs retain their own namespace. They are NOT completed work groups.
        auxiliary = ('historicalLeads', 'supplementalCompanySubwork', 'repositoryInventory', 'userAraPrInventory')
        for group in auxiliary:
            for i, item in enumerate(data.get(group, [])):
                record(con, sid, group + ':' + str(i), item, mapped='source-only')
        record(con, sid, '_document_context', {k:v for k,v in data.items()
               if k not in auxiliary and not (isinstance(v, list) and v is items)}, mapped='source-only')


def import_file(con, filename, kind, as_of=None):
    path = Path(filename).expanduser()
    raw = path.read_bytes()
    text = raw.decode('utf-8-sig')
    if SECRET.search(text):
        raise ValueError('possible credential detected; remove secrets before importing (content not printed)')
    data = json.loads(text)
    sid = 'source:' + digest(raw)
    old = con.execute('SELECT kind FROM sources WHERE id=?', (sid,)).fetchone()
    if old:
        if old[0] != kind:
            raise ValueError('same bytes already imported with different kind')
        if kind == 'portfolio':
            # Backfill stable non-slug activity identities without rewriting existing rows.
            with con:
                portfolio_import(con, data, sid, missing_only=True)
        # source maps can be safely replayed after missing project/evidence imports arrive.
        if kind == 'source-map':
            with con:
                con.execute('DELETE FROM source_records WHERE source_id=?', (sid,))
                source_map_import(con, data, sid)
        return {'source': sid, 'duplicate': True, 'counts': counts(con)}
    stored = digest(raw) + '.json'
    dest = home() / 'sources' / stored
    if dest.is_symlink():
        raise ValueError('source may not be a symlink')
    # No private files ever go below the public checkout, including env overrides.
    with con:
        dest.write_bytes(raw)
        dest.chmod(0o600)
        con.execute('INSERT INTO sources VALUES(?,?,?,?,?,?,?,?)',
                    (sid, digest(raw), path.name, stored, kind, now(), as_of, 'partial'))
        {'portfolio': portfolio_import, 'evidence': evidence_import,
         'inventory': inventory_import, 'source-map': source_map_import}[kind](con, data, sid)
    return {'source': sid, 'duplicate': False, 'sha256': digest(raw), 'counts': counts(con)}


def git(repo, *args, check=True):
    result = subprocess.run(['git', '-C', str(repo), *args], text=True,
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    if check and result.returncode:
        raise ValueError('git ' + args[0] + ' failed: ' + result.stderr.strip())
    return result


def local_repo_id(repo):
    url = git(repo, 'remote', 'get-url', 'origin', check=False).stdout.strip()
    # Only GitHub namespaces recognized; never persist credential-bearing remote URLs.
    m = re.search(r'github\.com[:/]([^/\s]+/[^/\s]+?)(?:\.git)?$', url)
    return repo_name(m[1]) if m else 'local:' + digest(str(Path(repo).resolve()).encode())[:16]


def since_date(value):
    # Explicit local KST boundary; date means midnight inclusive.
    parsed = dt.datetime.fromisoformat(value)
    return parsed.replace(tzinfo=KST) if parsed.tzinfo is None else parsed.astimezone(KST)


def plan(con, repo, ref, since, authors=None):
    if ref.startswith('-'):
        raise ValueError('ref may not begin with a dash')
    start = since_date(since)
    overlap = start - dt.timedelta(days=7)
    rid = local_repo_id(repo)
    tip = git(repo, 'rev-parse', '--verify', ref + '^{commit}').stdout.strip()
    if authors:
        for pattern in authors:
            try:
                re.compile(pattern)
            except re.error as error:
                raise ValueError('invalid author regex: ' + str(error)) from error
    scope = dump(sorted(authors)) if authors else 'all'
    checkpoint = con.execute('SELECT * FROM checkpoints WHERE repo=? AND ref=? AND author_scope=?', (rid, ref, scope)).fetchone()
    mode, warnings = 'date-with-overlap', []
    range_arg = tip
    complete_ancestor = False
    if checkpoint and checkpoint['coverage'] == 'full':
        ancestor = git(repo, 'merge-base', '--is-ancestor', checkpoint['sha'], tip, check=False).returncode == 0
        if ancestor:
            mode, range_arg = 'complete-cursor-range', checkpoint['sha'] + '..' + tip
            complete_ancestor = True
        else:
            warnings.append('Complete cursor is not an ancestor of ref; date fallback, history gap requires review')
    else:
        warnings.append('No continuous/full review checkpoint; selected evidence is not complete coverage')
    # Ancestry delta is unbounded by dates: newly reachable OLD commits are not lost.
    # Date fallback uses committer date because late cherry-picks may retain old author date.
    log_args = ['log', '--no-decorate', '--format=%H%x1f%aI%x1f%cI%x1f%an%x1f%ae%x1f%s%x1e']
    raw = (git(repo, *log_args, range_arg).stdout if complete_ancestor else
           git(repo, *log_args, '--since-as-filter=' + overlap.isoformat(), tip).stdout)
    known = {r[0] for r in con.execute('SELECT sha FROM evidence WHERE repo=? AND sha IS NOT NULL', (rid,))}
    result, seen, already = [], set(), 0
    for chunk in raw.split('\x1e'):
        fields = chunk.strip('\n').split('\x1f')
        if len(fields) != 6:
            continue
        sha, authored, committed, name, email, title = fields
        if sha in seen:
            continue
        seen.add(sha)
        if authors and not any(re.search(pattern, name + ' <' + email + '>') for pattern in authors):
            continue
        if sha in known:
            already += 1
            continue
        result.append({'id': 'git:' + rid + ':' + sha, 'sha': sha, 'authoredAt': authored,
                       'committedAt': committed, 'author': name + ' <' + email + '>',
                       'title': title, 'state': 'unreviewed_candidate'})
    return {'repo': rid, 'ref': ref, 'pinnedSha': tip, 'requestedSinceKst': start.isoformat(),
            'overlapStartKst': overlap.isoformat(), 'mode': mode, 'warnings': warnings,
            'knownSkipped': already, 'candidateCount': len(result), 'candidates': result,
            'limits': ['Local Git only; no fetch/network, PR/Slack/wiki inspection or public edits',
                       'Date fallback cannot guarantee detection of old committer-date history outside overlap',
                       'Candidate metadata is not patch review, ownership, merged PR or production proof',
                       'plan never advances checkpoints or approves/publishes content']}


def set_cursor(con, args):
    if args.coverage == 'full' and not args.confirm_reviewed:
        raise ValueError('full coverage requires --confirm-reviewed after actual continuous review')
    if args.ref.startswith('-'):
        raise ValueError('invalid ref')
    sha = git(args.repo, 'rev-parse', '--verify', args.ref + '^{commit}').stdout.strip()
    scope = dump(sorted(args.author)) if args.author else 'all'
    with con:
        con.execute('''INSERT INTO checkpoints VALUES(?,?,?,?,?,?,?,NULL)
                    ON CONFLICT(repo,ref,author_scope) DO UPDATE SET sha=excluded.sha,
                    examined_at=excluded.examined_at,coverage=excluded.coverage,note=excluded.note,source_id=NULL''',
                    (local_repo_id(args.repo), args.ref, scope, sha, now(), args.coverage, args.note))
    return {'repo': local_repo_id(args.repo), 'sha': sha, 'coverage': args.coverage,
            'warning': 'Human attestation only, not independently proven continuous review'}


def backup(con, dest=None):
    target = private_path(dest) if dest else home() / 'backups' / ('ledger-' + dt.datetime.now(KST).strftime('%Y%m%d-%H%M%S-%f') + '.tar.gz')
    # An explicit destination may be /tmp or Desktop: never chmod its existing parent.
    if not target.parent.exists():
        secure_dir(target.parent)
    if target.exists():
        raise ValueError('backup destination exists')
    snapshot = home() / 'backups' / ('snapshot-' + os.urandom(8).hex() + '.sqlite3')
    db = sqlite3.connect(snapshot)
    con.backup(db)
    db.close()
    snapshot.chmod(0o600)
    try:
        with tarfile.open(target, 'w:gz') as archive:
            archive.add(snapshot, arcname='ledger.sqlite3')
            for row in con.execute('SELECT stored_name,sha256 FROM sources ORDER BY id'):
                if not re.fullmatch(r'[0-9a-f]{64}\.json', row['stored_name']):
                    raise ValueError('invalid stored source filename')
                source = home() / 'sources' / row['stored_name']
                if source.is_symlink():
                    raise ValueError('source may not be a symlink')
                if digest(source.read_bytes()) != row['sha256']:
                    raise ValueError('source integrity mismatch')
                archive.add(source, arcname='sources/' + row['stored_name'])
        target.chmod(0o600)
    except Exception:
        target.unlink(missing_ok=True)
        raise
    finally:
        snapshot.unlink(missing_ok=True)
    return {'backup': str(target), 'sha256': digest(target.read_bytes()), 'includes': 'consistent SQLite snapshot and all imported original source bytes'}


def restore(filename):
    root = home()
    if (root / 'ledger.sqlite3').exists():
        raise ValueError('restore only into a new JEAMXN_ACTIVITY_HOME; refusing overwrite')
    # No extractall, paths, symlinks, arbitrary files or oversized archive members.
    secure_dir(root)
    with tarfile.open(filename, 'r:gz') as archive:
        seen = set()
        for member in archive.getmembers():
            if not member.isfile() or member.name in seen or member.size > 100 * 1024 * 1024:
                raise ValueError('invalid archive member')
            seen.add(member.name)
            if member.name != 'ledger.sqlite3' and not re.fullmatch(r'sources/[0-9a-f]{64}\.json', member.name):
                raise ValueError('invalid archive path')
        if 'ledger.sqlite3' not in seen:
            raise ValueError('missing database snapshot')
        for member in archive.getmembers():
            dest = root / member.name
            secure_dir(dest.parent)
            dest.write_bytes(archive.extractfile(member).read())
            dest.chmod(0o600)
    con = db_open()
    try:
        if con.execute('PRAGMA integrity_check').fetchone()[0] != 'ok':
            raise ValueError('restored database failed integrity check')
        for row in con.execute('SELECT stored_name,sha256 FROM sources'):
            if not re.fullmatch(r'[0-9a-f]{64}\.json', row[0]):
                raise ValueError('invalid restored source filename')
            if digest((root / 'sources' / row[0]).read_bytes()) != row[1]:
                raise ValueError('restored source integrity mismatch')
        return status(con)
    finally:
        con.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    for cmd in ('init', 'status', 'checkpoints'):
        sub.add_parser(cmd)
    imp = sub.add_parser('import')
    imp.add_argument('--file', required=True)
    imp.add_argument('--kind', required=True, choices=('inventory', 'evidence', 'portfolio', 'source-map'))
    imp.add_argument('--as-of', help='Source observation boundary, never full review coverage')
    p = sub.add_parser('plan')
    p.add_argument('--since', required=True)
    p.add_argument('--repo', required=True)
    p.add_argument('--ref', default='origin/main')
    p.add_argument('--author', action='append', help='Explicit verified author regex; stored cursor scope must match')
    cur = sub.add_parser('cursor')
    cur.add_argument('--repo', required=True)
    cur.add_argument('--ref', default='origin/main')
    cur.add_argument('--coverage', choices=('partial', 'full'), default='partial')
    cur.add_argument('--note', required=True)
    cur.add_argument('--author', action='append')
    cur.add_argument('--confirm-reviewed', action='store_true')
    b = sub.add_parser('backup')
    b.add_argument('--to')
    r = sub.add_parser('restore')
    r.add_argument('--file', required=True)
    args = parser.parse_args()
    try:
        if args.command == 'restore':
            result = restore(args.file)
        else:
            con = db_open()
            try:
                if args.command in ('init', 'status'):
                    result = status(con)
                elif args.command == 'import':
                    result = import_file(con, args.file, args.kind, args.as_of)
                elif args.command == 'plan':
                    result = plan(con, args.repo, args.ref, args.since, args.author)
                elif args.command == 'cursor':
                    result = set_cursor(con, args)
                elif args.command == 'checkpoints':
                    result = [dict(row) for row in con.execute('SELECT * FROM checkpoints ORDER BY repo,ref')]
                elif args.command == 'backup':
                    result = backup(con, args.to)
            finally:
                con.close()
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except (ValueError, OSError, sqlite3.Error, json.JSONDecodeError, tarfile.TarError) as error:
        print(json.dumps({'error': str(error)}, ensure_ascii=False), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
