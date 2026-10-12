# Architecture

## 원칙

이 레포는 ara의 폴더 구조와 스택을 사용하는 독립 포트폴리오입니다. ara의 비공개 코드·자산·운영 설정을 옮기는 레포가 아닙니다.

- `packages/contract`: Zod wire schema와 그 inferred type이 요청·응답의 유일한 계약입니다.
- `packages/core`: 검토된 공개 포트폴리오만 관리합니다. 사이트, PDF, 공개 지식 안내가 같은 데이터를 사용합니다.
- `packages/api`: `/api`를 호출하는 타입 클라이언트입니다. 비밀 키나 서버 구현을 포함하지 않습니다.
- `packages/token`, `icon`, `ui`: 시각 언어와 재사용 프리미티브입니다. 앱에 의존하지 않습니다.
- `apps/web`: React Router의 route는 feature를 조합하는 얇은 진입점입니다. `app/feature/<domain>`은 서로 import하지 않고, 공통 요소는 `app/shared/{lib,widget}`에 둡니다.
- `apps/server`: NestJS 도메인 모듈입니다. 다른 도메인 접근은 그 도메인의 `*.public.ts` export를 사용합니다. 앱 조립 파일은 모듈을 직접 등록할 수 있습니다.

`~/*`는 웹 app, `#*`는 서버 src입니다. `scripts/check-boundary.mjs`는 import/export/정적 dynamic import를 AST로 검사하여 feature 간 의존성, shared→feature, 패키지→앱, core→비공개 인터뷰, 서버 도메인 내부 접근을 막습니다. 데이터 공개 가능성 자체는 자동 판정할 수 없으므로 콘텐츠 리뷰를 별도로 수행합니다.

## 런타임

```text
브라우저 / Dokploy HTTPS 라우터
           |
      web :8080 (nginx, 정적 frontend)
           | /api/* same-origin proxy
      server :3000 (Nest, non-root)
           | shared bounded quota
      valkey :6379 (internal network, persistent volume)
```

- RR `ssr: false` 빌드는 `apps/web/build/client`에 생성됩니다. `/`, `/about`, `/work/ara`, `/work/dipull`, `/resume`를 프리렌더합니다.
- nginx는 존재하는 route `index.html`을 먼저 반환하고 나머지 페이지는 RR SPA fallback으로 이어집니다. 없는 파일 확장자 경로는 HTML 대신 404입니다.
- `/api/health`, `/api/portfolio`, `/api/assistant/status`, `POST /api/assistant/chat`, `/api/resume.pdf`를 Nest에 그대로 프록시합니다.
- PDF는 public core 콘텐츠와 번들 OFL 한글 폰트를 사용합니다. Chromium/외부 PDF 렌더링 서비스가 필요하지 않습니다.
- MongoDB와 기존 semothon DB는 새 구조에서 사용하지 않습니다. 공개 콘텐츠는 Git에 버전 관리되어 별도 데이터 마이그레이션이 없습니다.

## 빌드와 비밀 경계

Dockerfile은 Node 24.16.0 Debian bookworm slim에서 frozen pnpm install과 Turbo build를 실행합니다. `web`과 `server` target은 같은 build stage를 공유하고, 별도 `valkey` target은 설정 파일을 이미지에 포함합니다. 서버는 production dependency만 `pnpm deploy --legacy --prod`로 가져옵니다. 앱 소스 mount나 컨테이너 시작 시 의존성 설치는 없습니다.

키·origin·모델은 서버 **런타임** 환경변수입니다. frontend build args, 브라우저 readable env, 소스 콘텐츠에 비밀을 넣지 않습니다. `.dockerignore`는 로컬 환경 파일을 제외해야 합니다. 공통 GitHub CI는 키 없이 같은 빌드와 검사 및 이미지 빌드를 수행하며, registry push/운영 배포는 하지 않습니다.

## 공개 지식과 제한

공개 콘텐츠 밖 원본 인터뷰·회사 내부 문서·계정 정보는 AI 입력이 아닙니다. AI 기본값은 off이며 키가 없으면 local FAQ라고 명시합니다. opt-in AI는 고정 설정된 OpenAI-compatible HTTPS endpoint를 사용하고 사용자 제공 URL을 fetch하지 않습니다.

서버는 origin allowlist, JSON 크기/대화 길이, 상류 응답 크기/timeout, 출력 token, peer/global 분당 quota, 일별 quota 및 동시 실행 제한을 사용합니다. production Compose는 `AI_REQUIRE_VALKEY=true`로 shared store 불가 시 제한을 우회하지 않습니다. 제한은 남용 방어 장치이지 프롬프트 인젝션 완전 방어나 비용 보증이 아닙니다. 공급자 계정의 별도 지출 제한도 설정해야 합니다.

클라이언트 forwarding header는 신뢰하지 않습니다. 현재 서버 peer는 socket 주소여서 모든 nginx 경유 요청이 한 peer quota를 공유합니다. Dokploy의 실제 trusted proxy CIDR을 확인하지 않고 임의 `trust proxy=true`로 바꾸지 마세요. IP별 정확한 quota가 필요하면 nginx trusted real-ip와 서버의 지정 proxy hop을 함께 검증하는 별도 변경이 필요합니다.
