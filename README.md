# jeamxn

최재민의 개인 포트폴리오입니다. 기술 역할 하나보다 **제품을 만드는 사람**의 작업과 이야기를 담습니다. 대표 프로젝트는 `ara`와 Dipull입니다.

ara의 스택과 폴더 원칙을 참고한 독립 모노레포이며, 비공개 ara 제품 코드를 복제하지 않습니다. 웹사이트·이력서 PDF·공개 포트폴리오 안내가 `packages/core`의 검토된 공개 콘텐츠 하나를 공유합니다.

## 구성

```text
apps/server/            NestJS API, PDF, 공개 콘텐츠 FAQ / 선택적 AI
apps/web/               React Router 정적 프리렌더 + React
packages/contract/      Zod 요청·응답 타입
packages/api/           같은 origin /api 타입 클라이언트
packages/core/          공개 포트폴리오 콘텐츠의 단일 원본
packages/token/         디자인 토큰
packages/icon/          아이콘
packages/ui/            UI 프리미티브
infra/                  nginx, Valkey, 선택적 로컬 Compose override
Dockerfile              web / server / valkey 멀티스테이지 런타임 이미지
docker-compose.yml     Dokploy가 읽는 레포 최상단 배포 계약
```

Node **24.16.0**, pnpm **10.33.0**, Turbo 기반입니다. React 19, React Router 8, Vite 8, Tailwind 4, Nest 12, TypeScript 6, Zod 4, Biome 2를 사용합니다. 실제 의존성 버전은 lockfile에 고정됩니다.

## 빠른 시작

```sh
nvm use
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

개발 웹 `http://localhost:5410`, API `http://localhost:5411/api/health`입니다. 키가 없으면 외부 AI 호출 없이 공개 콘텐츠 FAQ로 안내합니다. pnpm dev는 `.env`를 자동 로드하지 않으므로 [개발 가이드](docs/development.md)의 환경변수 예시를 확인하세요.

## 검증

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
docker compose -f docker-compose.yml config -q
```

루트 Compose는 host 포트를 공개하지 않습니다. 로컬 컨테이너 확인은 별도 override로 격리합니다.

```sh
docker compose -p jeamxn-portfolio-test -f docker-compose.yml -f infra/compose.local.yml up --build -d
curl --fail http://127.0.0.1:5412/api/health
```

## 문서

- [아키텍처와 공개 정보 경계](docs/architecture.md)
- [개발·테스트](docs/development.md)
- [Dokploy 배포·운영·롤백](docs/deployment.md)

## 공개 정보와 AI

원본 인터뷰·회사 내부 링크·자격증명·개인 문서는 이 레포의 데이터 소스가 아닙니다. AI는 검토된 공개 콘텐츠만 설명하며, 기본값은 비활성화입니다. 실제 AI 연결은 운영자가 서버에 키와 모델을 명시적으로 설정한 경우만 사용합니다. 질문이 외부 제공자에게 전송되는 상태는 UI에 표시합니다.

샘플 프로젝트 화면에 가상 데이터가 사용되면 제품 샘플임을 표시합니다. ara는 실험 단계의 사이드 프로젝트이고, Dipull 사용량은 재학 당시의 관찰 기록이지 현재 운영 실측이 아닙니다.
