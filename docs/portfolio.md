# jeamxn

최재민의 개인 포트폴리오입니다. 제품을 만드는 사람의 작업과 이야기를 담아요.
대표 작업은 ara / Dipull / PFCT / KT SAT 강연이고, 전체 작업 기록에서 검색과 분류를 제공해요.

**백엔드 없이 GitHub Pages에 배포하는 정적 사이트**입니다. 질문 패널·FAQ 답변·AI API와
모델 설정은 제거했어요. 본문에 소개한 AI 프로젝트 사례와42개 문장의 스크롤 이야기,
제품 화면·3D 연출은 그대로 남아 있어요. 이력서 PDF도 빌드할 때 미리 생성해요.

## 구성

```text
apps/web/               React Router 정적 프리렌더 + React
packages/contract/      공개 콘텐츠의 Zod 스키마
packages/core/          웹과 PDF가 공유하는 공개 원고
packages/resume-pdf/    빌드 전용 한국어 PDF 생성기·글꼴 자산
packages/token/         디자인 토큰
packages/icon/          아이콘
packages/ui/            UI 프리미티브
scripts/                정적 빌드·Pages 같은 미리보기·검증
.github/workflows/      검증 CI와 GitHub Pages 배포
```

Node **24.16.0**, pnpm **10.33.0**을 사용해요. 기존 서비스의 비공개 소스·운영자료는 포함하지 않아요.

## 로컬 실행

```sh
nvm use
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

개발 주소는 `http://localhost:5410`이에요. 별도 API·DB·AI 키는 필요 없어요.
빌드된 정적 파일을 확인하려면:

```sh
pnpm build
pnpm preview
# http://127.0.0.1:5414/
```

## GitHub Pages

```sh
JEAMXN_BASE_PATH=/jeamxn/ \
JEAMXN_SITE_URL=https://jeamxn.github.io/jeamxn pnpm build
node scripts/serve-static.mjs --base /jeamxn/ --port 5414
# http://127.0.0.1:5414/jeamxn/
```

업로드 대상은 **`apps/web/build/client`만**이에요. GitHub 저장소의
**Settings → Pages → Source → GitHub Actions**를 선택하면 `pages.yml`이 실제 Pages 설정의
root/project 경로를 읽어 빌드하고, 검증한 파일만 배포해요. main push 또는 수동 실행이 배포 조건이에요.
이 설정 파일을 작성하는 것만으로 현재 운영이나 DNS가 바뀌지는 않아요.

`jeamxn.dev` 같은 커스텀 도메인은 Pages 설정·DNS를 별도로 확인한 뒤 연결해요.
자세한 전환 순서는 [배포 가이드](deployment.md)에 있어요.

## 검증

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm test:static
pnpm preview
# 다른 터미널
QA_BASE_URL=http://127.0.0.1:5414 pnpm test:pages
```

사진은 원본 앱을 **가상 데이터로 실행한 화면**이라는 고지를 유지해요. 수치·귀속·현재 상태와
비공개 근거는 [콘텐츠 지침](content.md), [활동 원장 지침](activity-ledger.md)을 따라요.

- [아키텍처](architecture.md)
- [개발·검증](development.md)
- [GitHub Pages 배포](deployment.md)
- [한국어 PDF 검증](resume-pdf.md)
