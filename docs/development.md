# Development

## 준비

```sh
nvm use
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Node24.16.0을 사용해요. `pnpm dev`는 공개 패키지와 PDF를 빌드한 뒤 웹5410을 열어요.
API·AI 키·DB·Valkey는 없어요. `.env`는 자동으로 읽지 않고 필요한 공개 설정은 셸에서 지정해요.

## 빌드와 엄격한 정적 미리보기

```sh
pnpm build
pnpm preview
# http://127.0.0.1:5414/
```

`serve-static.mjs`는 URL이 실제 파일/디렉터리에 매핑될 때만200응답하고 나머지는404예요.
Vite의 SPA fallback만 확인한 결과를 GitHub Pages 호환 검증으로 대신하지 않아요.

```sh
JEAMXN_BASE_PATH=/jeamxn/ JEAMXN_SITE_URL=https://jeamxn.github.io/jeamxn pnpm build
node scripts/serve-static.mjs --base /jeamxn/ --port 5414
QA_BASE_URL=http://127.0.0.1:5414/jeamxn pnpm test:pages
```

## 검사

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm test:static
node scripts/verify-media.mjs
node scripts/verify-copy.mjs
QA_BASE_URL=http://127.0.0.1:5414 pnpm test:pages
QA_BASE_URL=http://127.0.0.1:5414 pnpm test:e2e
```

`QA_BASE_URL`에는 repo 하위 경로를 포함할 수 있어요. Pages 검사는 기본 Chromium,
`QA_ENGINES=chromium,webkit`으로 두 엔진을 확인해요. 다른 스크롤·GPU 하네스의 엔진 범위는 각 파일을 확인해요.
본문·검색·메뉴·캡처 고지·줄별 스크롤과 모션 감소는 그대로 보존해요.
PDF는 실다운로드 뒤 MuPDF/PDFKit 글자·그림·OCR 검사를 유지해요.
실제 Pages 배포 성공과 로컬 정적 호환 검증은 별도 증거예요.

## 선택적 정적 컨테이너

루트`docker-compose.yml` 위치는 그대로예요. web 하나만 빌드하고 실행해요.

```sh
docker compose -p jeamxn-portfolio-preview -f docker-compose.yml -f infra/compose.local.yml up --build -d --wait
curl --fail http://127.0.0.1:5412/healthz
curl --fail http://127.0.0.1:5412/resume.pdf -o /tmp/jeamxn-resume.pdf
```

공유 Docker/ara/Lily 프로세스를 정리하지 않아요. 기존 프로젝트의 서버·Valkey 잔여 컨테이너를
제거할 때도 해당 project와 대상만 명시하며, 다른 DB나 volume을 지우지 않아요.
