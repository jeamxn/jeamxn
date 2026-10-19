# avanturation 웹 기본값 이식

## 기준과 범위

2026-10-18에 `https://avanturation.com/`의 실제 HTML, 스타일시트,
폰트 요청, 390 / 768 / 1440px Chromium computed style을 확인했어요.
분위기를 비슷하게 만든 것이 아니라, 본문 서체·크기·행간·자간·콘텐츠 폭을
측정한 값으로 옮겼어요. 홈의 스크롤 장면은 별도 컴포넌트에서 다뤄요.
기존 프로젝트 이미지, 갤러리의 자연 비율, 기록 선반의 3초 회전과 측정용 행은 유지해요.
웹 폰트만 바꾸며 서버의 PDF 폰트·조판·공개 콘텐츠는 바꾸지 않아요.

기본 화면은 연한 회색 `#f7f7f7`, 잉크 `#161616`, 흰 표면을 사용해요.
홈 스크롤 장면 한 곳에 시각적 변화를 집중하고, 나머지는 왼쪽 정렬과
같은 본문 리듬을 사용해요. 문장 일부만 임의로 명조로 강조하는 것은 피하고,
명조가 필요한 장면은 제목 전체에 적용하도록 폰트만 준비했어요.

## 실제 소스 근거

원본은 회사 맥의 임시 조사 폴더 `/tmp/jeamxn-avanturation-1018/reference/`에 있어요.
이 폴더의 HTML·CSS·스크린샷은 공개 앱에 포함하지 않아요.

| 조사 자료 | 확인 지점 |
| --- | --- |
| `index.html:108` | header 내부 `max-w-[1000px]`, `px-5`, `py-4` |
| `index.html:146–152` | 바깥 최대 폭 1000px, section `px-5`, `py-[60px]`, `max-[750px]:py-10`, `gap-10`; h1 40px / 600 / 1.3 / -1.2px |
| `index.html:167–190` | 본문 tracking -0.48px, 16px / 1.5, 72% 잉크 |
| `index.html:219–235` | section h2도 같은 40px 세트; 내부 간격 40px |
| `0_pgvt3_~b2ml.css:614–665` | 긴 글 flex gap 16px, h1 40/52, h2 28/37.8, h3 20/28, 본문 16/28 |
| `0_pgvt3_~b2ml.css:1118–1120` | 실제 최대 폭 1000px |
| `0_pgvt3_~b2ml.css:1330–1332` | section 상하 60px |
| `0_pgvt3_~b2ml.css:1372–1394` | 12 / 14 / 16 / 24 / 40px 및 제목 1.3 / 1.4 |
| `0_pgvt3_~b2ml.css:1445–1461` | 크기별 자간 -0.36 / -0.42 / -0.48 / -0.72 / -1.2px |
| `0_pgvt3_~b2ml.css:1832–1834` | 750px 이하 상하 40px |
| `0_pgvt3_~b2ml.css:1845` 이후 | Interlude Variable dynamic subset 187개의 `@font-face` |
| `computed.json` | 3개 화면 폭에서 실제 rect, 글꼴, 크기·행간·자간·패딩 및 CDP 사용 폰트 |

`computed.json`의 CDP `usedFont`는 한글·라틴 모두 `Interlude Variable`,
`isCustomFont: true`로 확인됐어요. family 이름만 비슷한 폴백을 기준 삼지 않았어요.

## 원본 브라우저 측정표

| 항목 | 390px | 768px | 1440px |
| --- | --- | --- | --- |
| 기본 글자 / 본문 | 16px / 24px | 16px / 24px | 16px / 24px |
| 본문 자간 | -0.48px | -0.48px | -0.48px |
| h1·section h2 | 40px / 52px / 600 / -1.2px | 동일 | 동일 |
| section 상하 패딩 | 40px | 60px | 60px |
| section 내부 gap | 40px | 40px | 40px |
| section 바깥 x / 폭 | 0 / 390px | 0 / 768px | 220 / 1000px |
| section 내용 x / 폭 | 20 / 350px | 20 / 728px | 240 / 960px |
| 원본 header 높이 | 56px | 56px | 56px |

원본 `body` 자체의 computed 자간은 `normal`이고, 본문 컨테이너에
-0.48px가 있어요. 이 앱은 평범한 본문이 빠짐없이 같은 값을 상속하도록
body 기본에 -0.48px를 두고, 제목·라벨은 각 크기의 자간으로 덮어썼어요.

## 앱에 적용한 값

`apps/web/app/app.css`의 기존 클래스 선언과 기존 breakpoint 선언을 직접 고쳤어요.
새로운 범용 div 중첩 선택자나 페이지 전체 `!important`는 추가하지 않았어요.
마지막의 짧은 breakpoint 구간은 960px 기준에서 줄 수가 늘어나는 실제 그리드의
모바일 배열을 명시해요. 홈 스크롤 장면의 클래스는 이 파일에서 다루지 않아요.

| 역할 | 크기 / 행간 / 자간 / 굵기 | 실제 대상 예 |
| --- | --- | --- |
| 일반 본문 | 16 / 24 / -0.48 / 400 | 소개 외 일반 설명, 프로젝트 요약, 기록 설명, FAQ 대화·입력 |
| 긴 본문 | 16 / 28 / -0.48 / 400 | `.story-section p`, `.work-story p`, `.about-story p`, `.resume-profile` |
| 페이지·section 제목 | 40 / 52 / -1.2 / 600 | `.page-heading h1`, `.work-title-line h1`, `.archive-heading h1`, `.section-intro h2`, `.home-about h2` |
| 긴 글 h2 | 28 / 37.8 / -0.84 / 600 | `.story-section h2`, `.work-story h2` |
| 짧은 제목 | 24 / 33.6 / -0.72 / 600 | `.resume-item h3`, `.archive-record h3`, `.screen-details h3` |
| 작은 본문 | 14 / 21 / -0.42 / 400 | 날짜, 역할, 목차 링크, 보조 조작 |
| 설명·메타 | 12 / 18 / -0.36 / 400 | 화면 캡션, 글 출처, 기록 종류, PDF 안내 |
| section 상하 | 60px, 750px 이하 40px | `--section-space` |
| 내부 주요 간격 | 40px | section 제목 이후, 2열 사이, 이야기 단락 묶음 |
| 본문 문단 간격 | 16px | 긴 글과 소개 문단 |
| 콘텐츠 폭 | `min(calc(100% - 40px), 960px)` | `.container` |

`--font-sans`와 `--font-display`는 둘 다 `Interlude Variable`이에요.
`font-optical-sizing: auto`, `font-variation-settings: normal`, 일반 너비를 사용해요.
원본의 가변 축은 `opsz` 14–32 / `wght` 100–900 / `wdth` 75–125이며,
강제 고정 축 값으로 비슷하게 보이도록 만들지 않았어요.

### 그대로 복제하지 않은 점

- **탐색 높이:** 원본은 56px이지만 이 앱은 실제 질문·메뉴 버튼의 44px 터치 영역을
  줄이지 않도록 header를 76px로 유지해요. 페이지 흐름에 놓이며 새로운 sticky 오프셋을 만들지 않아요.
- **가독성:** 원본의 36% 잉크는 낮은 대비라 그대로 옮기지 않아요.
  보조 글자는 읽을 수 있는 `#555555`를 사용해요. 72% 잉크는 배경 위 근사치예요.
- **콘텐츠 구조:** 원본 사이트의 주인공·작업물·문구·로고·아바타를 복제하지 않아요.
  프로젝트 갤러리, 이력 날짜 열, 검색 필터와 목차는 이 앱의 실제 정보 구조를 유지해요.
- **긴 프로젝트 이름:** 제목 크기를 임의로 작게 만들지 않고 줄바꿈을 허용해요.
  모바일에서는 이력·메타·목차·보조 열을 쌓아 제목과 버튼이 잘리지 않게 해요.
- **기록 선반:** 기존 측정용 `.rotation-measure`와 행 높이 변수를 보존해요.
  본문 크기를 줄이거나 고정 높이 안에 잘라 숨기는 방식은 사용하지 않아요.
- **이미지:** `.screen-image img`의 `height:auto` / `object-fit:contain`과
  `.project-scene--natural`의 자연 비율을 바꾸지 않았어요.
- **강조 색:** 사이트 고유의 코발트 링크·포커스 표시는 유지해요.

## 폰트 자산과 권리

### Interlude Variable

- 공식 프로젝트: <https://github.com/avanturation/interlude>
- 실제 사이트에 사용된 WOFF2 파일 **187개**, 총 **13,719,992바이트**를 그대로 보관해요.
- `public/fonts/interlude/fonts.css`는 원본의 모든 face·범위·weight·stretch·display를 유지하고
  URL만 `/fonts/interlude/` 아래로 바꿨어요. 원 CSS의 187개 블록과 자동 비교했어요.
- `manifest.json`에 원 URL, 용량, SHA-256을 기록해요. 각 파일의 `wOF2` 서명과 해시를 검사했어요.
- 폰트 전체를 매번 받는 것은 아니에요. `unicode-range`에 따라 화면의 문자에 필요한 조각만 요청해요.
- family 이름과 원본 font data를 수정하지 않았어요.
- SIL Open Font License 1.1 원문 `LICENSE.txt`, Inter·Pretendard 원 저작권과
  라이선스 `Inter-LICENSE.txt`, `Pretendard-LICENSE.txt`, `NOTICE.md`를 함께 넣었어요.

### 홈 제목용 Noto Serif KR

- 공식 프로젝트: <https://github.com/google/fonts/tree/main/ofl/notoserifkr>
- Google Fonts CSS API의 variable 500–600 dynamic subset **124개**,
  총 **6,257,608바이트**를 로컬에 보관해요. 원본 data와 범위는 수정하지 않았어요.
- `public/fonts/noto-serif-kr/` 아래에 같은 manifest·OFL·출처 안내가 있어요.
- `--font-story-serif: "Noto Serif KR", Georgia, serif`로 사용할 수 있어요.
- 이 서체는 avanturation의 본문 서체라고 주장하지 않아요. 사용자가 요청한 홈의
  고딕·명조 혼용을 위한 별도 합법적 자산이에요.

### 요청 방식

`root.tsx`에서 두 로컬 font CSS를 링크해요. 브라우저 런타임에 외부 폰트 CDN을 호출하지 않아요.
미리로드하는 폰트는 라틴·기본 기호용 Interlude base **1개, 146,284바이트**뿐이에요.
한글 조각 186개나 명조 전체를 preload하지 않아요. Wanted Sans·Geist import/preload는 제거했어요.
폰트가 로드되기 전에는 시스템 글꼴을 사용해요. 실제 사용 폰트의 최종 확인은
`document.fonts.ready` 이후 CDP platform fonts와 네트워크 요청을 함께 보아야 해요.

## 이 하위 작업에서 확인한 것

- Node **24.16.0**, `pnpm exec biome check apps/web/app/app.css apps/web/app/root.tsx` 통과
- 같은 Node 버전에서 `pnpm --filter @jeamxn/web typecheck` 통과
- Interlude face 187개 모두 원 CSS와 **URL을 제외하고 동일**함을 자동 확인
- Interlude 187개·Noto Serif KR 124개 파일의 WOFF2 서명·SHA-256 확인
- 홈 스크롤 소스, 서버, PDF, core 콘텐츠, lockfile, manifest, 인프라 파일은 편집하지 않음

전체 앱 빌드·통합 검사, 실제 화면의 390 / 768 / 1440px 비교와 폰트 로드 후 확인은
부모 작업에서 함께 수행해요. 위 수치는 원본 측정값과 소스 반영값이며,
최종 화면까지 모두 동일하다고 미리 단정하지 않아요.

## 스크롤 이야기와 원고 통합

홈은 같은 8개 도구 그림을 유지한 채, 스크롤 진행률에 따라 접힌 묶음 → 학교의
생활 도구 → 동료들의 연결된 업무 → 하나의 AI 작업공간으로 이동해요.
음악 / 세탁 / 일정 / 문서 / 현황 / 데이터 / 대화 / 아이디어는 실제 프로젝트의
맥락을 설명하는 장식이며 클릭할 수 있는 앱 버튼이 아니에요. 아이콘과 연결선의
위치는 같은 순수 진행률 함수에서 계산해요. 휠을 막거나 별도 자동 재생 시계를
쓰지 않고, 반대로 스크롤하면 같은 위치로 되돌아가요. 모션 감소·좁거나 짧은
화면·JavaScript가 없는 경우에는 전체 내용을 일반 문서 흐름으로 읽을 수 있어요.

고딕은 Interlude, 명조는 Noto Serif KR을 제목의 전체 구절 단위로 사용해요.
일반 소개·설명·보조 문구는 Interlude 본문 규격을 유지해요.

2026-10-18 21:05 추가 요청에 따라 소개와 사례, 전체 작업 기록, 인터페이스·FAQ
문구도 첨부 이력서의 구체적인 불편 → 한 일 → 달라진 점을 중심으로 다시 썼어요.
새로운 수치나 단독 기여를 만들지 않았고, 공동 작업·AI 지원·실험·후배 인계 같은
원래 사실은 유지했어요. PDF도 같은 공개 원고를 `[ 문제 정의 ]` / `[ 해결 과정 ]` /
`[ 개선된 점 ]` 순서로 짧게 투영해요. PDF의 서체는 별도 원본 이력서 기준의
Pretendard 전체 임베딩이며, 웹의 Interlude 변경과 섞지 않아요.

실제 이미지 저장·computed 수치·OCR은 직접적인 사람의 미감 승인과는 구분해요.
새 폰트가 정말 쓰이는지는 브라우저의 platform fonts로, PDF 글자 누락은 실제
내려받은 전 페이지를 MuPDF와 PDFKit으로 렌더한 픽셀 및 이미지 OCR로 확인해요.

### Fullscreen and navigation follow-ups

The owner's21:23 correction makes the homepage story a full-width100svh stage,
not a960px reading column. Its header and controls use viewport-edge gutters;
ordinary copy and other pages keep the measured reading widths. The21:34
follow-up replaces flat illustrated SVG tools with real procedurally modeled
Three.js meshes with scroll-driven3-axis rotation, Z movement and staggered
appearance. The SVGs are only a fallback if WebGL cannot initialize; reduced
motion and no-JS modes retain readable narrative without a required canvas.

The owner's21:25 navigation now has two tabs: 이력, 작업 기록. Biography, original
portrait and interests are part of `/resume#introduction`; `/about` renders a
complete resume in static HTML and replaces the URL when JS runs. The archive
pins exactly the same3 resume-selected works at its top, without duplicate rows
or bypassing search/filter matching. Row horizontal padding is24px,20px on small
screens. The active navigation marker stays4×4px;44px hit area belongs to the
link, not to its pseudo-element.
