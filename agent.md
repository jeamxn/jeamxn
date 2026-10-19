# 포트폴리오 작업 지침

이 파일과 `AGENTS.md`, `docs/architecture.md`, `docs/development.md`,
`docs/content.md`를 먼저 읽는다. 활동 근거 저장/이어 조사는
`docs/activity-ledger.md`와 `scripts/activity-ledger.py`를 사용한다.

## GitHub 프로필 README 보존

루트 `README.md`는 `github.com/jeamxn` 프로필에 표시된다. 기존 프로필 원문은
그대로 보존하며 포트폴리오 개발·배포 안내는 `docs/portfolio.md`와 `docs/`에 둔다.

## 정적 배포 구조 (2026-10-19)

AI 답변·정적 FAQ 대화 기능은 사용자 요청으로 코드에서 제거했다. 질문 UI/API/모델 키/
서버를 되살리지 않는다. 프로젝트 원고의 AI 사례와 느린3D는 삭제 대상이 아니다.
웹은 GitHub Pages 정적 배포이며 PDF는 packages/resume-pdf가 빌드 때 생성한다.
루트/저장소 하위 경로를 모두 검사하고 실제 공개 배포·DNS 전환은 별도 승인을 받는다.

## 원고와 근거의 위치

- 공개 원고: `packages/core/src/portfolio.ts`와 그 공개 데이터 모듈
- 비공개 조사 원장: `~/.local/share/jeamxn/activity-ledger/ledger.sqlite3`
- 비공개 원본 사본: 같은 폴더의 `sources/<sha256>.json`
- 일관된 DB+원본 백업: 같은 폴더의 `backups/*.tar.gz`
- `JEAMXN_ACTIVITY_HOME`으로 별도 비공개 위치를 쓸 수 있다. 저장소 안은 금지
- 앱/PDF 생성기는 이 DB나 원본을 읽지 않는다. SQLite는 조사 도구일 뿐
  사이트의 콘텐츠 DB나 승인 엔진이 아니다

원본을 삭제하거나 이동하지 않고 사본과 SHA-256을 보관한다. 회사 내부 URL,
패치, 계정, 인터뷰, 개인정보는 공개 저장소/문서/스크린샷/AI 컨텍스트에 넣지
않는다. CLI의 민감 토큰 검사는 보조 검사이며 모든 비밀을 찾는 보장은 아니다.
Git/Docker ignore를 우회해 원장이나 백업을 추가하지 않는다. 비공개 원본을
공개로 변환하는 자동 export는 없다.

## “2026-10-11 이후 활동 이어서 추가해줘”라고 하면

1. `python3 scripts/activity-ledger.py status`와 `checkpoints`로 기존 조사 범위를
   읽는다. 가져온 날짜, 코드 작성일, 사용자가 말한 기간, 패치 검토 수준,
   공개 검토 상태는 서로 다르다. `--as-of`는 전수 조사 완료일이 아니다
2. 기존 원고와 source_records의 projectKey/sourceRefs를 읽는다. 공개 slug와
   정확히 일치하지 않는 원항목은 unmapped 후보로 유지한다. 제목 유사성만으로
   연결하지 않는다. slug 없는 활동은 title/organization/period identity hash로
   조회하며 공개 slug를 발명하지 않는다. 기준문서 ID만 보관한 자료는 본문
   수집·hash 검증을 완료했다고 말하지 않는다. 원본 한 항목을 여러 제품 성과로 중복 계산하지 않는다
3. 사용자가 말한 날짜를 KST 기준 포함 경계로 해석한다. 레포별 로컬 ref를
   고정하고 아래 명령으로 후보를 만든다. origin/main이 아닌 레포는 실제
   기준 ref로 바꾼다. CLI는 네트워크/fetch를 하지 않는다

   ```sh
   python3 scripts/activity-ledger.py plan \
     --repo /path/to/local/repo --ref origin/main --since 2026-10-11
   ```

   기본값은 날짜 앞 7일을 겹쳐 committer-date로 메타데이터를 찾고 이미 원장에
   있는 repo+fullSHA를 제외한다. 작성일이 옛날인 늦은 cherry-pick도 검토한다.
   완전 검토 checkpoint가 실제로 있고 현재 ref의 조상이면 정확한 SHA 범위를
   읽는다. partial checkpoint, 날짜 범위 밖의 옛 timestamp 커밋, rebase,
   ref 이동/수집 실패는 별도 공백으로 보고한다. 후보 수는 완료 성과 수가 아니다
4. 후보의 실제 패치/관련 PR/기존 대화를 읽고 기여·채택·검증 범위를 기록한다.
   추가 네트워크 조회는 필요와 범위를 확인한 뒤 별도로 수행한다. metadata
   색인/대표 patch/전체 연속 검토/운영 출하를 구분한다. author/committer,
   봇 squash, 공동작업, AI 지원, 동료 구현, 사용자 제안을 보존한다
5. 새 evidence JSON을 비공개 위치에 만들고 `import --kind evidence`로 원본과
   출처를 남긴다. 알 수 없는 연결은 그대로 보류한다. raw 출처를 지우지 않는다
6. 새 원고는 초안으로 제안한다. 기존 확인된 본인 수정/기간/기여를 덮어쓰지
   않는다. user_notes와 review_state는 importer가 바꾸지 않는다. public snapshot
   가져오기는 당시 원고를 보존할 뿐 원문 사실성이나 공개 허가를 승인하지 않는다
7. 실제 연속 검토를 끝낸 범위만 `cursor --coverage full --confirm-reviewed`로
   기록할 수 있다. 대표 21개 패치나 과거 통합조사 파일 전체를 가져온 사실만으로
   2026-10-18까지 모두 검토했다고 표시하지 않는다. 계획 실행은 커서를 전진시키지 않는다
8. 원본/DB 백업과 테스트, 공개 변경 diff 검토를 수행하고 추가·중복·미연결·공백을
   보고한다. 커밋/push/운영 배포는 별도 요청 없이는 하지 않는다

## 내용과 귀속의 고정 경계

- 가운뎃점은 양옆 공백 하나: `기상송 · 세탁`. 붙여 쓰거나 슬래시로 자동 치환하지 않는다.
- 메인 문장에는 읽는 호흡의 명시적 줄바꿈을 넣는다. 문장이 충분히 머물고 서로
  겹치지 않게 하며, 각 줄은 스크롤에 맞춰 순서대로 드러낸다(시간 자동 재생 금지).
  스크롤에는 짧은 시각 감쇠를 사용하되 네이티브 스크롤을 막지 않는다.
  사용자가 허용한 느린 장식 3D 모션은 문장을 자동 진행하지 않고, 모션 감소/정적/화면 밖에서는 멈춘다.
- 메인은 사용자가 인사하고 이야기를 들려주는 문장형 전개를 쓴다. 실제 제품 화면은
  가상 데이터 실행 고지를 유지하고, 회사 화면을 임의로 꾸며 만들지 않는다.
- 문체는 사용자가 준 이력서의 담백한 1인칭 해요체. 구체적인 불편→한 일→변화로
  연결하며 감정/효과/동기를 새로 만들어 붙이지 않는다
- 개인 프로젝트/외부 활동의 배경과 비교에 회사 제품을 끌어오지 않는다.
  ara 시작 배경의 에이전트 예시는 Hermes Agent, Claude Code, Codex
- PFCT Internal은 흩어진 어드민 통합·권한/보안·DPD, AX는 Lily·사내 개발/업무
  도구 MCP 연결·AI 활용 발표. DPD의 Internal 분류는 사용자 정정이다. Git에서
  관찰한 2026년 1~4월 날짜를 이전 연도로 옮기거나 재직기간을 고치지 않는다
- ara는 통합 에이전트. 공동 아이디어/개발/테스트와 AI 지원을 유지하고 purpose
  제안과 구현 기여를 구분한다. 두 사람의 실험을 상용 출하로 부풀리지 않는다
- Dipull은 학교 인트라넷. 초반 개발과 후속 기여 커뮤니티/인계를 구분한다
- KT SAT는 외부 활동이며 PFCT 사내 발표와 다르다. 발표 시나리오와 구현된 도구,
  준비 자료와 실제 운영 성공을 혼동하지 않는다
- `draftThought`는 본문 아래 따로 보여주는 당시 생각이다(초안 라벨 없음). 확정 본문이나
  역사적 직접 인용으로 승격하지 않는다. PDF의 확정 원고에 포함하지 않는다
- 코드의 존재, 기본 ref에서 도달 가능, PR 머지, CI 성공, 운영 반영,
  실제 사용자 효과는 서로 다른 사실이다. 관찰 수를 독립 제품 수로 부르지 않는다

## 검증

```sh
python3 tests/activity-ledger-test.py
python3 scripts/activity-ledger.py status
python3 scripts/activity-ledger.py backup
```

공개 원고/앱 변경이 있다면 `pnpm build`, `pnpm typecheck`, `pnpm lint`,
`pnpm test`, 관련 브라우저 QA와 PDF 글자/그림 검사를 추가한다. 전체 QA는
작업자의 실제 실행 범위대로 보고한다. 기존 ara/Lily 프로세스·DB·인프라를
건드리지 않고 로컬 미리보기만 확인한다. 고친 PDF의 전체 폰트/CMap 경로를
다른 방식으로 되돌리지 않는다.
