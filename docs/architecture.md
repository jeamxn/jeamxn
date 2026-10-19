# Architecture

## 정적 사이트

이 포트폴리오는 기존 제품의 폴더 원칙을 참고한 독립 모노레포예요.
비공개 제품의 소스·데이터·계정을 가져오지 않아요.

- `packages/contract`: 공개 콘텐츠 Zod 스키마와 inferred type
- `packages/core`: 웹과 PDF가 공유하는 검토된 공개 원고
- `packages/resume-pdf`: Node 빌드 전용 생성 함수·전체 TTF·한국어 조판
- `packages/token`, `icon`, `ui`: 시각 언어와 공통 프리미티브
- `apps/web`: 얇은 route, `feature/<domain>`, `shared/{lib,widget}`

2026-10-19 정적 전환으로 Nest API·질문 UI·FAQ/AI 추론·API 클라이언트·모델 설정·제한 저장소를 제거했어요.
프로젝트 사례에서 설명하는 AI 기술이나42개 스크롤 문장은 이 제거 대상이 아니에요.

## 빌드와 배포

```text
공개 core + 빌드 전용 PDF 생성기
              ↓ pnpm build
React Router 프리렌더 HTML + JS/CSS/사진/폰트 + resume.pdf
              ↓ apps/web/build/client만 업로드
GitHub Pages → 방문자 브라우저
```

`JEAMXN_BASE_PATH`는 `/` 또는 `/jeamxn/`처럼 공개 URL 경로예요.
Vite base·RR basename·실제 이미지/폰트/링크를 함께 맞춰요.
RR가 prefix 아래 만든 HTML은 정적 빌드 마지막에 artifact 루트로 평탄화해요.
`JEAMXN_SITE_URL`은 그 경로까지 포함한 전체 공개 주소이고 canonical·OG·sitemap에 사용해요.
Turbo 캐시에 두 설정을 포함해 서로 다른 배포의 산출물이 섞이지 않게 해요.

모든 공개 상세 주소는 `route/index.html`로 미리 생성해요. 실제404는 `404.html`을 사용하고,
없는 API를 SPA HTML의200응답으로 숨기지 않아요. 정적 호스트에는 앱 서버가 없어요.
`resume.pdf`는 빌드 때 생성된 파일이며 브라우저에 PDF 생성 라이브러리·전체 TTF를 넣지 않아요.

## 경계

브라우저는 `packages/resume-pdf`를 import하지 않아요. packages는 app을 import하지 않고,
web feature 사이의 조합은 route가 맡아요. `scripts/check-boundary.mjs`가 이 경계를 검사해요.
활동 원장·원본 조사 자료는 저장소와 빌드 외부에 보관하고 자동 공개하지 않아요.
API 키나 서비스 비밀이 필요한 기능은 없어요. `.env.example`은 공개 빌드·로컬 포트 설정뿐이에요.
GitHub Pages의 HTTP 헤더 제약은 별도 nginx 설정을 작성한다고 바뀌지 않아요.
루트 Compose는 과거 도구 호환을 위한 선택적 정적 웹 컨테이너이며 Pages 배포에 필요하지 않아요.
