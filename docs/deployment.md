# Deployment: Dokploy

## 필수 배포 계약

Dokploy는 **레포 최상단 `docker-compose.yml`**을 사용합니다. 파일을 infra 안으로 옮기지 마세요. Compose build context는 루트 상대경로 `.`이며 `Dockerfile`의 `web`·`server`·`valkey` target을 사용합니다.

| 서비스 | 역할 | 내부 포트 | 외부 연결 |
| --- | --- | --- | --- |
| web | nginx 정적 프리렌더 + `/api` proxy | 8080 | Dokploy Domains UI 대상 |
| server | NestJS API/PDF/FAQ·선택적 AI | 3000 | 직접 publish하지 않음 |
| valkey | shared quota/concurrency | 6379 | internal data network만 |

root Compose에는 host port, domain/Traefik label, `container_name`, `network_mode: host`가 없습니다. 기존 semothon DB/app과 host network 구성은 제거되었습니다. 콘텐츠는 Git에 있으므로 MongoDB 이전 작업이 없습니다. 예전 DB/volume은 운영자가 새 배포 확인 전에 임의 삭제하지 않습니다.

## 설정

1. Dokploy Git repository와 승인된 commit을 선택하세요. Compose path는 `docker-compose.yml`입니다.
2. Domains UI에서 원하는 도메인을 **web service, container port 8080, HTTP upstream**에 연결하세요. HTTPS 종료는 Dokploy/Traefik이 담당합니다. 레포에 운영 도메인 label을 하드코딩하지 않습니다.
3. Dokploy의 **Preview Compose**에서 `web`와 `server`가 공통 `edge` 네트워크를 유지하고, `server`와 `valkey`의 `data` 네트워크가 내부로 남는지 확인하세요. Dokploy 공식 문서는 비격리 배포에서 Domains 대상 서비스에 `dokploy-network`를 추가한다고 설명합니다. 네트워크를 바꾸는 설치/버전에서는 Isolated Deployments를 사용하거나 Preview 결과에 필요한 공통 네트워크를 보존해야 합니다. Valkey를 공용 ingress 네트워크에 노출하지 않습니다.
4. 서버 runtime env `JEAMXN_PUBLIC_ORIGIN`을 실제 `https://<본인 도메인>`으로 설정하세요. 쉼표 allowlist를 지원하지만 불필요한 origin은 추가하지 않습니다. path/query/fragment는 허용되지 않습니다.
5. 처음에는 `AI_ENABLED=false`, `AI_API_KEY` 없음으로 배포합니다. 사이트·PDF·local FAQ가 정상인 뒤 AI opt-in을 별도로 수행하세요.
6. `VALKEY_URL`과 `RESUME_FONT_PATH`는 Compose에서 내부 서비스/번들 폰트로 정합니다. Valkey password나 port를 임의 공개하지 않습니다.

### 서버 런타임 변수

| 변수 | 기본값 / 의미 |
| --- | --- |
| JEAMXN_PUBLIC_ORIGIN | Compose 로컬 `http://127.0.0.1:5412`; 운영에서는 실제 HTTPS origin 필수 |
| AI_ENABLED | `false`; `true` + key일 때만 외부 AI |
| AI_API_KEY | 빈 값; Dokploy 환경변수/비밀 관리에만 저장 |
| AI_MODEL | `gpt-4.1-mini`; 예시 모델, 본인 계정 제공 여부·가격 확인 후 명시 |
| AI_BASE_URL | `https://api.openai.com/v1`; 운영 HTTPS OpenAI-compatible endpoint |
| AI_TIMEOUT_MS | `12000`; 서버 검증 범위 50–30000ms |
| AI_PEER_LIMIT | `12`; 서버 peer별 quota, 현재 proxy가 하나의 peer |
| AI_GLOBAL_LIMIT | `100`; shared global quota / minute |
| AI_DAILY_LIMIT | `300`; shared daily quota, 1–10000 |
| AI_CONCURRENCY | `2`; shared in-flight 제한, 최대4 |
| AI_REQUIRE_VALKEY | production Compose에서 `true`; store 실패 시 fail-closed |
| VALKEY_URL | `redis://valkey:6379/0`, 외부 공개 안 함 |
| RESUME_FONT_PATH | `/app/asset/fonts/NanumGothic-Regular.ttf` |

AI 질문이 제공자에게 전송됨을 UI에 표시합니다. 서버의 bounded context/output/timeout/limits 외에 제공자 계정의 월 예산·rate limit도 별도로 설정하세요. 모델 미지원·인증·timeout은 local FAQ fallback으로 표시됩니다. 키가 없을 때 AI처럼 가장하지 않습니다.

## 이미지와 운영 안전

- build: Node `24.16.0-bookworm-slim`, pnpm `10.33.0`, frozen lockfile, Turbo 전체 그래프 1회. 같은 builder를 두 runtime target이 재사용합니다. `pnpm deploy --legacy --prod`로 서버 production 의존성을 가져옵니다.
- 보안 헤더: self-only CSP, frame-ancestors none, object-src none, nosniff, referrer/permissions 제한을 응답에 포함합니다. RR 프리렌더 hydration과 인라인 스타일에만 unsafe-inline을 허용하고 unsafe-eval·외부 CDN은 허용하지 않습니다.
- frontend: nginx-unprivileged `1.28.0-bookworm`, non-root uid101, readonly rootfs, `/tmp` tmpfs. `web`에는 서버 env나 AI 키가 없습니다.
- server: non-root Node uid1000, readonly rootfs, 64MiB `/tmp` tmpfs, 512MiB memory, shutdown 20s. PDF 폰트/OFL을 이미지에 포함하며 Chromium은 없습니다.
- Valkey: `8.1.3`, 설정은 이미지에 포함하고 source/config bind mount 없이 persistent named volume `/data`, maxmemory96MiB/noeviction, container192MiB, AOF everysec. 인증 없는 store는 internal Docker network에서만 접근 가능해야 합니다. 다른 앱/외부 host를 data network에 붙이지 않습니다.
- 전 서비스 capability drop, no-new-privileges, PIDs128, 회전 JSON 로그를 사용합니다. 로그는 요청 body/key/query를 기록하지 않습니다.
- nginx는 Docker DNS를 10초 주기로 다시 조회하여 server 재생성 뒤 낡은 컨테이너 IP를 유지하지 않습니다.
- `depends_on` health 순서는 Valkey→server→web입니다. `/healthz`는 nginx만, `/api/health`는 서버만 검사하므로 후속 스모크에서 FAQ/PDF도 확인하세요. store readiness는 health만으로 판단하지 않습니다.

서버는 socket peer만 사용하고 forwarding headers를 신뢰하지 않습니다. nginx도 visitor-supplied XFF를 덮어씁니다. 따라서 현재 quota는 전체 gateway에 공유되며 IP별로 정확하지 않습니다. 정확한 IP가 필요하면 Dokploy ingress CIDR/경로를 실측하고 nginx real-ip trusted subnet + server 지정 proxy hop을 함께 보안 검증하세요. 아무 proxy header나 신뢰해 rate-limit 우회를 만들지 않습니다.

## 배포 전·후 점검

```sh
pnpm build && pnpm typecheck && pnpm lint && pnpm test
docker compose -f docker-compose.yml config -q
# JSON/env 전체 config를 공개 채널에 붙이지 않음 (키를 출력할 수 있음)
```

GitHub CI는 같은 검증과 런타임 이미지 build 후 독립 project를 시작해 실제 컨테이너 HTTP에서 Playwright regression(390/768/1440px, 15route, FAQ, PDF)을 수행합니다. 스크린샷·report·PDF를 7일 artifact로 보관하고 성공/실패 모두 해당 CI project만 정리합니다. secrets 입력·image push·Dokploy production deploy는 하지 않습니다.

배포 뒤 실제 도메인에서 다음을 확인하세요.

- `/`, `/about`, `/work/ara`, `/work/dipull`, `/resume` 직접 진입과 새로고침, hashed assets, 없는 asset404
- `/api/health`200, `/api/portfolio`, `/api/assistant/status`의 local 모드
- `/api/resume.pdf`200과 실제 한글 텍스트·폰트
- same-origin JSON chat은 local FAQ, 다른 origin/잘못된 body는 거절
- 유효 FAQ 반복 요청에 quota 적용; gateway/server/Valkey 로그에 비밀 없음
- Dokploy TLS, web8080 라우팅, server/Valkey 외부 port 미공개
- opt-in한 경우에만 mock 또는 승인된 소량 요청으로 AI 동작/timeout fallback을 확인

실제 production 접근·배포는 별도 승인 작업입니다. 파일 작성/로컬 config 검증을 운영 배포 완료로 보고하지 않습니다.

## 장애 복구

Valkey 장애 시 FAQ/AI 요청은 503으로 fail-closed하며 정적 웹·PDF·server health는 계속 응답할 수 있습니다. store를 정상 복구한 다음 server를 재시작하여 shared-limiter 연결을 다시 맺으세요. 현재 클라이언트는 무한 재연결/명령 큐를 두지 않습니다. `depends_on`은 초기 시작 순서이지 런타임 자동 장애 복구 정책이 아닙니다. 스모크로 quota/store 연결 회복을 확인하세요.

## Rollout / rollback

첫 전환은 새 Compose service로 스모크를 통과한 후 Domains UI를 새 `web:8080`에 연결하세요. 이전 서비스·이미지·Git commit·Domains 설정을 기록해 두고 바로 삭제하지 않습니다. 새 구조는 DB schema migration이 없습니다.

같은 구조 사이의 rollback은 이전 검증 commit을 Dokploy에 지정하고 rebuild/redeploy한 뒤 위 스모크를 반복합니다. 이전 구조(semothon DB/app)로 되돌릴 경우에는 그 commit의 루트 Compose와 이전 Domains 대상·포트를 함께 복원해야 합니다. 새 `web:8080` 설정을 옛 app에 그대로 남기면 연결되지 않습니다.

Valkey quota volume은 같은 project를 유지하면 재사용됩니다. rollback을 위해 볼륨을 없앨 필요가 없습니다. `down -v`나 전체 prune은 rollback 수단이 아닙니다. 승인된 구버전으로 복원한 뒤 임시 서비스·domain 연결은 해당 project 범위에서만 정리합니다.

## 구현 시 로컬 검증 기록

2026-10-12 회사맥의 독립 `jeamxn-portfolio-test` project에서 수행했습니다. 운영 Dokploy 접근/배포 결과가 아닙니다.

- 루트 Compose와 local override `config -q`, Buildx bake 3target parse 통과
- Node24.16 frozen-install, Turbo 8 build 태스크 1회, 서버 production deploy114packages, web/server/valkey 실물 이미지 빌드 성공
- 3서비스 healthy, 모두 non-root/readonly/capdrop/PIDs/memory 적용, tmpfs 쓰기 성공
- 5개 프리렌더 route200, API health/portfolio/status200, FAQ local201, PDF200 (`application/pdf`, 약79KiB)
- hashed JS200+immutable, 없는 image/asset404, SPA fallback200
- foreign/missing origin 및 cross-site403, 다른 media415, 잘못된 schema400, 초과 payload413
- peer quota12회 local 응답 후429+Retry-After, Valkey 중단 시chat503+Retry-After(health200), store복구+server재시작 확인
- nginx `-t`, server 강제 재생성 뒤 DNS proxy 회복, frontend AI key env 없음, server/core 소스 제외와 한글 font 포함 확인
- AST boundary checker 정상 통과 및 의도적인 cross-feature/core→app/private fixture 거절 후 fixture 제거

회사망 DockerHub TLS 신뢰 체인 오류가 있어 로컬에서 **기존 신뢰된 Harbor 캐시의 동일 public tag**를 pull/tag하여 base 이미지를 제공했습니다. 레포의 FROM은 public registry를 유지하며 TLS 검증을 끄거나 운영 레지스트리 설정을 바꾸지 않았습니다. GitHub/Dokploy 빌드 환경의 정상 registry 연결은 각 환경에서 다시 확인해야 합니다.

추가 보강 검증: 같은 날 self-only CSP 헤더를 HTML/API/asset404 응답에 적용하고 재빌드했습니다. 390/768/1440px의 15route와 FAQ dialog·PDF를 실제 Chrome으로 확인했으며 CSP 차단 없이 통과했습니다(후속 PDF70,361B). production의 offscreen native lazy 이미지는 viewport로 스크롤하고 decode를 완료한 뒤 검사해야 합니다. CI도 production 컨테이너를 대상으로 이 브라우저 회귀를 실행하도록 구성했습니다.

참고: [Dokploy Compose Domains 공식 문서](https://docs.dokploy.com/docs/core/docker-compose/domains). 로컬 Compose 검증은 실제 Dokploy의 네트워크 변환/TLS 설정 검증을 대신하지 않습니다.
