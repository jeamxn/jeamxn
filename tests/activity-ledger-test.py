#!/usr/bin/env python3
import importlib.util
import json
import io
import tarfile
import os
from pathlib import Path
import sqlite3
import subprocess
import tempfile
import sys
import unittest

sys.dont_write_bytecode = True
SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/activity-ledger.py'
spec = importlib.util.spec_from_file_location('activity_ledger', SCRIPT)
ledger = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ledger)


class LedgerTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.old = os.environ.get('JEAMXN_ACTIVITY_HOME')
        os.environ['JEAMXN_ACTIVITY_HOME'] = str(self.root / 'private')
        self.con = ledger.db_open()

    def tearDown(self):
        self.con.close()
        if self.old is None:
            os.environ.pop('JEAMXN_ACTIVITY_HOME', None)
        else:
            os.environ['JEAMXN_ACTIVITY_HOME'] = self.old
        self.temp.cleanup()

    def source(self, name, data, kind):
        path = self.root / name
        path.write_text(json.dumps(data, ensure_ascii=False))
        return ledger.import_file(self.con, path, kind)

    def test_idempotence_source_bytes_and_review_preserved(self):
        data = {'projects': [{'slug': 'ara', 'name': 'ara', 'sections': [{'id': 'x'}]}], 'activities': []}
        self.source('public.json', data, 'portfolio')
        self.con.execute("UPDATE activities SET user_notes='edited by owner',review_state='owner-reviewed'")
        self.con.commit()
        before = ledger.counts(self.con)
        self.assertTrue(self.source('public.json', data, 'portfolio')['duplicate'])
        self.assertEqual(before, ledger.counts(self.con))
        data['projects'][0]['name'] = 'new snapshot'
        self.source('public2.json', data, 'portfolio')
        row = self.con.execute('SELECT * FROM activities').fetchone()
        self.assertEqual(row['user_notes'], 'edited by owner')
        self.assertEqual(row['review_state'], 'owner-reviewed')
        for row in self.con.execute('SELECT * FROM sources'):
            raw = (ledger.home() / 'sources' / row['stored_name']).read_bytes()
            self.assertEqual(ledger.digest(raw), row['sha256'])
        self.assertEqual((ledger.home().stat().st_mode & 0o777), 0o700)
        self.assertEqual(((ledger.home() / 'ledger.sqlite3').stat().st_mode & 0o777), 0o600)

    def test_non_slug_activities_have_stable_queryable_ids(self):
        data = {'projects': [], 'activities': [{'title': 'IT부 부장', 'organization': '학교', 'period': '2023'},
                                              {'title': 'KT SAT', 'slug': 'kt-sat-ax'}]}
        self.source('activities.json', data, 'portfolio')
        before = ledger.counts(self.con)
        ids = [r[0] for r in self.con.execute('SELECT id FROM activities ORDER BY id')]
        self.assertEqual(before['activities'], 2)
        self.assertTrue(any(x.startswith('activity:identity-') for x in ids))
        self.source('activities.json', data, 'portfolio')
        self.assertEqual(before, ledger.counts(self.con))
        self.assertEqual(ledger.status(self.con)['unmapped'], 0)

    def test_selected_evidence_dedup_and_exact_map(self):
        self.source('public.json', {'projects': [{'slug': 'pfct', 'name': 'PFCT'}]}, 'portfolio')
        ev = {'entries': [{'id': 'first', 'repo': 'pfct-admin', 'sha': 'a' * 40,
                          'ref': 'origin/main', 'refSha': 'b' * 40,
                          'date': '2026-01-01T00:00:00+09:00', 'thoughtStatus': 'DRAFT'}]}
        self.source('ev.json', ev, 'evidence')
        self.source('ev.json', ev, 'evidence')
        ev['entries'][0]['id'] = 'second-observation'
        self.source('ev2.json', ev, 'evidence')
        self.assertEqual(ledger.counts(self.con)['evidence'], 1)
        self.assertEqual(self.con.execute('SELECT count(*) FROM evidence_sources').fetchone()[0], 2)
        self.assertEqual(self.con.execute('SELECT coverage FROM checkpoints').fetchone()[0], 'partial')
        self.source('map.json', {'draftSourceMap': {'pfct:s': ['first'], 'missing:s': ['unknown']}}, 'source-map')
        self.assertEqual(ledger.counts(self.con)['activity_evidence'], 1)
        self.assertEqual(ledger.status(self.con)['unmapped'], 1)
        self.assertFalse(self.con.execute("SELECT 1 FROM activities WHERE review_state='approved'").fetchone())

    def test_unknown_inventory_retained_without_false_mapping(self):
        self.source('old.json', {'projectList': [{'projectKey': 'not-a-public-slug', 'sourceRefs': ['private://ref'], 'name': 'old'}]}, 'inventory')
        row = self.con.execute('SELECT * FROM source_records WHERE record_key != ?', ('_document_context',)).fetchone()
        self.assertEqual(row['mapping_status'], 'unmapped')
        self.assertIn('private://ref', row['payload_json'])
        self.assertEqual(self.con.execute('SELECT review_state FROM activities').fetchone()[0], 'research_candidate')

    def test_original_workgroups_evidence_and_auxiliary_catalogs(self):
        source = {'workGroups': [{'projectKey': '01:old', 'title': 'old',
                    'sourceRefs': ['01:a', '02:b'], 'publication': {'approved': False},
                    'evidence': [{'type': 'local-git', 'id': 'abcd1234', 'url': None, 'verified': True},
                                 {'type': 'GitHub-live-GET', 'url': 'https://github.com/org/repo/pull/1', 'id': 1}]}],
                  'historicalLeads': [{'projectKey': 'lead', 'countedAsIndependentCompletedProject': False}],
                  'repositoryInventory': [{'fullName': 'org/repo'}], 'canonicalInventoryCount': 1}
        first = self.source('original.json', source, 'inventory')
        before = ledger.counts(self.con)
        self.source('original.json', source, 'inventory')
        self.assertEqual(before, ledger.counts(self.con))
        self.assertEqual(before['activities'], 1)
        self.assertEqual(before['evidence'], 2)
        self.assertEqual(before['activity_evidence'], 2)
        self.assertEqual(self.con.execute('SELECT count(*) FROM evidence WHERE sha IS NOT NULL').fetchone()[0], 0)
        self.assertEqual(self.con.execute('SELECT count(*) FROM source_records').fetchone()[0], 4)
        self.assertEqual(ledger.status(self.con)['unmapped'], 1)
        self.assertEqual(ledger.counts(self.con)['checkpoints'], 0)

    def test_explicit_inventory_project_mapping_keeps_original(self):
        self.source('public.json', {'projects': [{'slug': 'ara', 'name': 'ara'}]}, 'portfolio')
        inv = self.source('inventory.json', {'workGroups': [{'projectKey': 'personal:ara', 'title': 'original',
                         'evidence': [{'type': 'git', 'id': 'shortsha'}]}]}, 'inventory')
        mapping = {'inventoryProjectMap': [{'projectKey': 'personal:ara', 'publicSlug': 'ara',
                    'inventorySourceId': inv['source'], 'rule': 'parent-approved exact personal namespace'}]}
        self.source('map.json', mapping, 'source-map')
        before = ledger.counts(self.con)
        self.source('map.json', mapping, 'source-map')
        self.assertEqual(before, ledger.counts(self.con))
        self.assertEqual(before['activities'], 2)
        self.assertEqual(self.con.execute("SELECT count(*) FROM activity_evidence WHERE activity_id='project:ara'").fetchone()[0], 1)
        self.assertEqual(self.con.execute("SELECT mapping_status FROM source_records WHERE activity_id='inventory:personal:ara'").fetchone()[0], 'explicit-project-map')
        self.assertEqual(ledger.status(self.con)['unmapped'], 0)

    def test_backup_restore(self):
        self.source('ev.json', {'items': [{'id': 'fact', 'fact': 'owner statement'}]}, 'evidence')
        expected = ledger.counts(self.con)
        backup = ledger.backup(self.con)['backup']
        os.environ['JEAMXN_ACTIVITY_HOME'] = str(self.root / 'restored')
        restored = ledger.restore(backup)
        self.assertEqual(restored['integrity'], 'ok')
        self.assertEqual(expected['sources'], restored['sources'])
        with self.assertRaisesRegex(ValueError, 'refusing overwrite'):
            ledger.restore(backup)

    def test_restore_rejects_traversal_before_writing(self):
        archive_path = self.root / 'bad.tar.gz'
        with tarfile.open(archive_path, 'w:gz') as archive:
            info = tarfile.TarInfo('../escaped')
            info.size = 3
            archive.addfile(info, io.BytesIO(b'bad'))
        os.environ['JEAMXN_ACTIVITY_HOME'] = str(self.root / 'restore-bad')
        with self.assertRaisesRegex(ValueError, 'invalid archive path'):
            ledger.restore(archive_path)
        self.assertFalse((self.root / 'escaped').exists())

    def test_backup_does_not_chmod_existing_parent(self):
        parent = self.root / 'external-backup'
        parent.mkdir()
        parent.chmod(0o755)
        result = ledger.backup(self.con, parent / 'snapshot.tar.gz')
        self.assertEqual(parent.stat().st_mode & 0o777, 0o755)
        self.assertEqual(Path(result['backup']).stat().st_mode & 0o777, 0o600)

    def test_secret_rejection_and_public_home_refusal(self):
        with self.assertRaisesRegex(ValueError, 'credential'):
            self.source('secret.json', {'x': 'ghp_' + 'a' * 36}, 'inventory')
        self.assertEqual(ledger.counts(self.con)['sources'], 0)
        os.environ['JEAMXN_ACTIVITY_HOME'] = str(SCRIPT.parent.parent / 'private-activity')
        with self.assertRaisesRegex(ValueError, 'outside'):
            ledger.db_open()

    def git(self, repo, *args, env=None):
        result = subprocess.run(['git', '-C', str(repo), *args], text=True,
                                capture_output=True, env=env, check=True)
        return result.stdout.strip()

    def repo(self):
        repo = self.root / 'repo'
        repo.mkdir()
        self.git(repo, 'init', '-b', 'main')
        self.git(repo, 'config', 'user.name', 'Verified Owner')
        self.git(repo, 'config', 'user.email', 'owner@example.test')
        self.git(repo, 'remote', 'add', 'origin', 'git@github.com:test-owner/test-repo.git')
        return repo

    def commit(self, repo, title, authored='2026-10-12T10:00:00+09:00', committed=None):
        env = dict(os.environ, GIT_AUTHOR_DATE=authored, GIT_COMMITTER_DATE=committed or authored)
        self.git(repo, 'commit', '--allow-empty', '-m', title, env=env)
        return self.git(repo, 'rev-parse', 'HEAD')

    def checkpoint(self, repo, sha, coverage='full'):
        self.con.execute('INSERT OR REPLACE INTO checkpoints VALUES(?,?,?,?,?,?,?,NULL)',
                         (ledger.local_repo_id(repo), 'main', 'all', sha, ledger.now(), coverage, 'test human reviewed'))
        self.con.commit()

    def test_date_overlap_committer_date_and_no_automatic_cursor(self):
        repo = self.repo()
        sha = self.commit(repo, 'late cherry-pick', '2021-01-01T00:00:00+09:00', '2026-10-18T10:00:00+09:00')
        p = ledger.plan(self.con, repo, 'main', '2026-10-11')
        self.assertEqual(p['repo'], 'test-owner/test-repo')
        self.assertEqual(p['candidateCount'], 1)
        self.assertEqual(p['candidates'][0]['sha'], sha)
        self.assertEqual(p['mode'], 'date-with-overlap')
        self.assertEqual(ledger.counts(self.con)['checkpoints'], 0)
        ledger.insert_evidence(self.con, {'id': 'known', 'repo': p['repo'], 'sha': sha}, self.source('empty.json', {'items': []}, 'evidence')['source'], 'known')
        self.con.commit()
        self.assertEqual(ledger.plan(self.con, repo, 'main', '2026-10-11')['candidateCount'], 0)

    def test_full_cursor_includes_newly_reachable_old_commit(self):
        repo = self.repo()
        first = self.commit(repo, 'base')
        self.checkpoint(repo, first)
        old = self.commit(repo, 'newly reachable old timestamp', '2020-01-01T00:00:00+09:00')
        p = ledger.plan(self.con, repo, 'main', '2026-10-11')
        self.assertEqual(p['mode'], 'complete-cursor-range')
        self.assertIn(old, [c['sha'] for c in p['candidates']])
        self.assertNotIn(first, [c['sha'] for c in p['candidates']])
        self.assertEqual(p['candidateCount'], 1)

    def test_nonancestor_cursor_warning(self):
        repo = self.repo()
        first = self.commit(repo, 'base')
        self.git(repo, 'checkout', '-b', 'other')
        other = self.commit(repo, 'other branch')
        self.git(repo, 'checkout', 'main')
        self.checkpoint(repo, other)
        p = ledger.plan(self.con, repo, 'main', '2026-10-11')
        self.assertEqual(p['mode'], 'date-with-overlap')
        self.assertTrue(any('not an ancestor' in w for w in p['warnings']))

    def test_full_cursor_requires_attestation(self):
        repo = self.repo()
        self.commit(repo, 'base')
        args = type('Args', (), dict(repo=repo, ref='main', coverage='full', author=None,
                                    note='unverified', confirm_reviewed=False))()
        with self.assertRaisesRegex(ValueError, 'confirm-reviewed'):
            ledger.set_cursor(self.con, args)


if __name__ == '__main__':
    unittest.main(verbosity=2)
