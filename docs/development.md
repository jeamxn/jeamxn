# Development

## 준비

```sh
nvm use # .nvmrc: 24.16.0
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install --frozen-lockfile
pnpm build
```

Node 20으로 빌드하지 않습니다. 패키지는 dist export를 사용하므로 새 workspace나 브랜치 변경 뒤에는 packages/core·contract 등을 포함한 빌드를 먼저 수행하세요. lockfile은 루트 조정 작업에서만 갱신합니다.

## 개발 서버

```sh
AI_ENABLED=false \
JEAMXN_PUBLIC_ORIGIN=http://localhost:5410,http://127.0.0.1:5410 \
AI_REQUIRE_VALKEY=false \
pnpm dev
```

- 웹: `http://localhost:5410`
- API: `http://localhost:5411/api/health`
- 웹 dev proxy의 `/api` 목적지는 `JEAMXN_DEV_API_URL` (기본 `http://127.0.0.1:5411`)입니다.
- `pnpm dev`는 `.env`를 자동 읽지 않습니다. 셸에서 명시적으로 export하거나 승인된 로컬 env loader를 사용하세요.
- `.env.example`은 컨테이너 테스트 origin `http://127.0.0.1:5412` 기준입니다. dev에는 위 origin을 사용하세요.
- 개발의 메모리 quota는 단일 프로세스 fallback입니다. production과 shared-limit 검증에는 별도 Valkey를 사용하세요. ara·릴리·monitoring 등의 store나 이미 사용 중인 포트를 재사용하지 않습니다.

## 검증 순서

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
# 부모/로컬 QA용 browser script가 준비된 뒤
pnpm test:e2e
docker compose -f docker-compose.yml config -q
docker compose -f docker-compose.yml -f infra/compose.local.yml config -q
```

`pnpm lint`는 Biome과 경계 검사기입니다. core의 공개 가능 여부, 이미지 권리, 수치·현재 상태·공동 작업 기여는 사람이 다시 검토해야 합니다. 웹 검증은 390/768/1440px, reduced-motion, 키보드 dialog focus, form 오류, 모든 직접 링크 진입을 포함하세요. 테스트는 실제 AI 키 없이 mock/local FAQ를 사용합니다.

## 로컬 컨테이너

기존 스택에 영향을 주지 않도록 project 이름을 지정합니다. 루트 Compose 자체는 port를 publish하지 않으며 local override만 loopback에 publish합니다.

```sh
docker compose -p jeamxn-portfolio-test -f docker-compose.yml -f infra/compose.local.yml up --build -d
docker compose -p jeamxn-portfolio-test -f docker-compose.yml -f infra/compose.local.yml ps
curl --fail http://127.0.0.1:5412/api/health
curl --fail http://127.0.0.1:5412/api/assistant/status
curl --fail http://127.0.0.1:5412/api/resume.pdf -o /tmp/jeamxn-resume.pdf
# 본인 테스트 project만 제거, 공유 Docker 리소스는 손대지 않음
docker compose -p jeamxn-portfolio-test -f docker-compose.yml -f infra/compose.local.yml down
```

`down -v`는 테스트 quota volume까지 없애는 의도적인 작업이므로 필요할 때만 실행합니다. `docker system prune`, 다른 project의 down, 기존 ara/lily 프로세스 종료는 이 작업의 일부가 아닙니다. 회사망 registry CA 문제는 신뢰된 CA/정상 네트워크를 통해 해결하며 TLS 검증을 끄지 않습니다.

## 콘텐츠 변경

먼저 `packages/core`의 공개 콘텐츠를 수정하고 schema validation, 웹 표시, PDF, FAQ를 함께 확인합니다. 원본 인터뷰를 파일로 복사하지 않습니다. 대표 프로젝트의 샘플 화면은 가상 데이터라면 이를 표시하며 운영 성과로 오해하게 만들지 않습니다.
