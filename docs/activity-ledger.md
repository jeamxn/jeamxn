# 활동 원장과 이어 조사

포트폴리오에 쓴 공개 문장과 그 문장을 검토할 때 본 비공개 자료를 분리한다.
이 도구는 Python 3.9+ 표준 라이브러리만 사용하며 앱의 DB/API, 새 서버,
네트워크 수집기, 자동 출판 기능이 아니다.

## 저장 경계

| 위치 | 내용 | 공개 여부 |
| --- | --- | --- |
| `packages/core/src/*` | 사람이 검토하는 사이트/PDF/AI용 원고 | 공개 |
| `scripts/activity-ledger.py`, 이 문서, `agent.md` | 도구와 작업 절차 | 공개 |
| `~/.local/share/jeamxn/activity-ledger/ledger.sqlite3` | 조사용 구조화 원장 | 비공개 |
| 같은 경로 `sources/<sha256>.json` | 가져온 JSON 원본 바이트 사본 | 비공개 |
| 같은 경로 `backups/*.tar.gz` | SQLite snapshot과 원본 전체 사본 | 비공개 |

`JEAMXN_ACTIVITY_HOME=/absolute/private/path`로 저장 위치를 바꿀 수 있다.
현재 checkout 내부 위치는 거절한다. 디렉터리는 700, DB/원본/백업은 600이다.
저장소에 private-* 디렉터리, 원장, SQLite/백업을 넣지 않는다. `.gitignore`와
`.dockerignore`가 이를 보조하며 원장 경로는 빌드/앱에 전달하지 않는다.
파일시스템 권한은 암호화가 아니므로 기기/사용자 계정/백업 접근권한도 보호한다.

CLI는 알려진 token/private-key 형태를 감지하면 가져오기를 거절한다. 이 검사는
모든 비밀·사내정보·개인정보를 찾는 DLP가 아니다. 원본은 가져오기 전에 직접
검토하고 자격증명은 제거한다. private source 전체를 공개 명령 출력이나 문서함의
공개 폴더에 붙이지 않는다. 기존 조사 원본은 복사하며 삭제/이동하지 않는다.

## 모델과 식별자

- `sources`: 원본 SHA-256, 최초 파일명, 보관 파일명, import 시각, kind,
  source_as_of, coverage. 같은 바이트의 재가져오기는 멱등이다
- `activities`: `project:<public-slug>`, `activity:<public-slug>`, 정확히 연결되지
  않은 원항목은 `inventory:<projectKey>`. public_snapshot_json과 research_json을
  분리한다. `curated_snapshot`은 원고 사본이지 독립 사실검증/공개 승인 아님
- `evidence`: `git:<repo-namespace>:<full-40-char-sha>` 또는 비코드 source+record ID. 과거의 PR/위키/대화 등 참조는
  `ref:<canonical-identity-sha256>`로 별도 색인하며 짧은 Git ID를 full SHA로
  발명하지 않는다.
  코드 관찰일과 검토 상태를 분리한다. 동일 SHA라도 다른 repo면 별개 근거다.
  bare 회사 repo명은 명시한 회사 namespace만 정규화한다
- `evidence_sources`: 동일 커밋의 여러 조사 관측을 각각 원본 payload와 연결한다.
  author, ref/refSha, patch 범위, 사용자 정정, 추정 동기 상태와 한계는 payload에
  보존한다. 임의로 sole authorship/운영 출하로 해석하지 않는다
- `activity_evidence`: 확인된 public slug와 section ID에 연결한 근거.
  private content-source-map의 명시 ID만 사용한다. `owner-direct-correction...`
  같은 별칭은 코드의 고정 alias로만 연결하며 제목 fuzzy matching은 하지 않는다
- `source_records`: 기존 통합조사의 모든 원항목/sourceRefs/sourceFragments를
  완전 JSON으로 보존한다. 알 수 없는 항목은 `unmapped`. 문서 context도 보관한다.
  slug 없는 공개 활동은 title/organization/period를 NFKC·공백 정규화한 hash로
  `activity:identity-<hash>`를 부여하고 source_records에도 원문을 보존한다. 공개 slug는
  발명하지 않는다. 해당 식별 메타가 바뀌면 명시 ID 대응을 검토한다
- `checkpoints`: repo/ref/author_scope별 SHA, examined_at, partial/full, note.
  대표 patch 가져오기는 partial 관측만 만든다. source_as_of, 파일 생성일,
  사용자 진술 기간, 작성일, 검토 완료일은 서로 대체하지 않는다
- `metadata`: 현재 schema_version. 다른 버전 DB는 묵시 변경하지 않고 거절한다

importer는 기존 `user_notes`/`review_state`를 덮어쓰지 않는다. source JSON은
불변 사본이고 activity의 snapshot은 새로운 원본을 가져오면 갱신될 수 있다.
사용자가 확인·수정한 조사 메모는 user_notes에, 공개 문장의 수정은 Git 원고에
남긴다. 원본의 추정 동기를 확정 문장으로 바꾸는 자동 승격 기능은 없다.

## 명령

저장소 루트에서 실행한다. 아래 파일명/경로는 형식을 보여주는 예시이며 실제
비공개 원본의 위치로 바꾼다. stdout의 상태/후보에는 비공개 메타가 있을 수 있다.

```sh
python3 scripts/activity-ledger.py init
python3 scripts/activity-ledger.py status
python3 scripts/activity-ledger.py checkpoints

# 공개 원고를 투영한 JSON: {projects:[{slug,...}],activities:[{slug,...}],...}
python3 scripts/activity-ledger.py import --kind portfolio --file /private/current-portfolio.json

# 기존 통합조사: workGroups/projects/projectList/catalog/items 배열, 원항목 projectKey를 유지
python3 scripts/activity-ledger.py import --kind inventory \
  --file /private/original-inventory.json --as-of 2026-10-11

# 대표 실제 patch 조사: entries/items 배열. repo와 full SHA, id, ref/refSha 등을 보존
python3 scripts/activity-ledger.py import --kind evidence --file /private/evidence.json

# {draftSourceMap:{"public-slug:section-id":["evidence-record-id"]},...}
python3 scripts/activity-ledger.py import --kind source-map --file /private/content-source-map.json

# '2026-10-11 이후' 후보. 이 예시는 origin/main이 기준인 로컬 repo
python3 scripts/activity-ledger.py plan \
  --repo /path/to/local/repo --ref origin/main --since 2026-10-11

# 계정 변형을 실제 author 목록으로 확인한 뒤에만 명시 regex를 사용
python3 scripts/activity-ledger.py plan \
  --repo /path/to/local/repo --ref origin/main --since 2026-10-11 \
  --author 'Verified Name <verified@example.test>'

# 단순 ref 관측 (기본 partial). 자동 fetch/네트워크 조회는 없음
python3 scripts/activity-ledger.py cursor --repo /path/to/local/repo \
  --ref origin/main --note 'selected representative patches only'

# 연속 범위를 진짜 검토한 뒤에만. 단순 파일 import나 plan으로 사용하지 말 것
python3 scripts/activity-ledger.py cursor --repo /path/to/local/repo \
  --ref origin/main --coverage full --confirm-reviewed \
  --note 'actual reviewed range and evidence, coverage gaps, author scope'

python3 scripts/activity-ledger.py backup
# 다른 비공개 위치로 복사할 사본도 직접 지정 가능, 기존 파일 덮어쓰기 금지
python3 scripts/activity-ledger.py backup --to /private/backup/ledger.tar.gz
# 원본 DB는 그대로 두고 새 위치에 복원 검증, 기존 DB에 덮어쓰기 금지
JEAMXN_ACTIVITY_HOME=/private/restore-test \
  python3 scripts/activity-ledger.py restore --file /private/backup/ledger.tar.gz
```

`backup`은 SQLite backup API로 일관된 snapshot을 만들고 hash가 일치하는 원본을
포함한다. `restore`는 알려진 DB/source 파일명만 허용하고 symlink/path traversal을
거절하며 DB integrity와 source SHA를 확인한다. tarball을 암호화하지는 않는다.

## 증분 계획의 의미

1. `--since` 날짜는 KST 자정 포함 경계다. 명시 offset 시간도 KST로 정규화한다
2. full checkpoint가 없으면 앞 7일을 겹쳐 로컬 Git의 committer date를 조회한다.
   author date가 과거인 늦은 cherry-pick을 놓치지 않기 위한 기준이다.
   `--since-as-filter`로 비단조 날짜가 있는 history도 traversal을 중단하지 않는다
3. 같은 repo/ref/author_scope의 full checkpoint가 현재 ref의 조상일 때는
   `checkpointSHA..pinnedTip` 전체를 날짜와 무관하게 읽는다. 이미 연속 검토된
   checkpoint의 조상은 다시 후보로 넣지 않는다.
   새로 도달 가능해진 옛 timestamp 커밋도 이 범위에 포함한다
4. 원장에 있는 repo+SHA는 후보에서 제외하고 knownSkipped로 표시한다. 원장에
   있다는 사실은 대표 검토 관측이지 모든 patch/출하/권리 승인이 아니다
5. partial/no checkpoint, non-ancestor/rebase, 날짜 밖의 옛 committer timestamp는
   조사 공백으로 안내한다. 날짜 fallback만으로 역사 전체 누락 0을 보장하지 않는다
6. 후보는 author/title/date 메타데이터일 뿐이다. 실제 patch/PR·봇·공동기여·채택·
   운영·공개 권리는 다음 단계에서 읽어야 한다. 후보를 evidence로 자동 import하거나
   checkpoint를 전진시키거나 공개 원고를 고치지 않는다. 사용자 계정 filter가 없다면
   모든 author가 후보에 들어간다는 점도 보고한다

같은 의미의 squash/원본/revert를 SHA가 다르다는 이유로 독립 성과로 세지 않는다.
기존 제품에 새 변경이 있으면 원래 프로젝트에 새 근거를 연결해 보강한다. public
slug와 다른 통합 key는 사람이 explicit mapping을 검토하기 전까지 unmapped로 둔다.

## 초기 자료의 범위

2026-10-18 초기화는 현재 공개 원고 86개 프로젝트와 활동 목록의 사본, 기존
통합조사 원본(실제 workGroups 192개, 원항목 sourceRefs 227개), 대표 실제 패치 21개(회사 12, 개인/학교 9), 비코드 정정/활동
관측과 명시 source map을 가져온다. 원본 목록의 개수와 공개 프로젝트 개수는
모집단이 다르다. 21은 완료 제품 수가 아니며 전기간/전레포 연속 검토도 아니다.
파일 import만으로 2026-10-18까지의 전체 활동을 검토했다고 표시하지 않는다.

## 검사

```sh
python3 tests/activity-ledger-test.py
```

테스트는 임시 DB/로컬 Git만 사용한다. 멱등 import, notes/review 보존, 원본 hash/
권한, 알 수 없는 source 무손실, 동일 SHA의 관측 병합, partial 범위, full 커서
확인 요구, KST 중첩/옛 author-date 커밋/새로 도달 가능한 옛 커밋, non-ancestor
경고, 공개 저장 경로 거절, credential 탐지, backup/restore를 확인한다.
이는 원고의 사실성/공개 권리 검수나 웹/PDF QA를 대신하지 않는다.

### 기존 자료의 보존 한계

기존 통합조사 JSON은 자체 원문과 조사 색인이다. 그 sourceRegistry가 가리키는
모든 MD/JSON/회사 문서 본문을 추가 수집해 보관했다는 뜻이 아니다. 인터뷰·원고
초안·기준 PDF·기존 공개 페이지는 별도 비공개 reference-only JSON으로 node ID나
URL만 등록할 수 있다. 이 실행에서 내려받지 않은 자료는 contentSha256=null,
verification=unverified/reference-only로 기록하고 독립 hash 검증을 주장하지 않는다.
참조 node ID나 비공개 문서 본문은 이 공개 문서나 agent.md에 복사하지 않는다.

### 명시 제품 연결

source-map의 `inventoryProjectMap`은 원본 source ID/projectKey와 공개 slug,
승인한 규칙을 별도 비공개 JSON으로 보관한다. `personal:<exact-public-slug>`는
부모가 확인한 namespace만 제거하고, domain=ara/company는 부모가 승인한
ara/PFCT 제품 분류로만 연결한다. 제목 fuzzy matching은 하지 않는다.
원본 inventory 행과 payload는 유지하면서 public activity_evidence를 추가한다.
정확한 규칙에 해당하지 않는 항목은 명시적으로 unmapped로 둔다. 이것은
회사 원문·공개 권리의 자동 승인이나 새 성과를 만드는 과정이 아니다.
