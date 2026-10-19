# GitHub Pages 배포

## 현재 구조

사이트는 정적 HTML/JS/CSS/사진/폰트/PDF만 필요해요. 서버·API·DB·AI 키는 사용하지 않아요.
배포 artifact는 `apps/web/build/client`예요. 원본 소스나 활동 원장·백업을 업로드하지 않아요.

## GitHub 설정

1. 변경 코드를 검토해 main에 반영해요. 설정 작성만으로는 기존 운영이 바뀌지 않아요.
2. 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택해요.
3. 저장소 Actions가 허용되어 있고 `github-pages` 환경 승인 규칙을 충족하는지 확인해요.
4. main push 또는 **Deploy GitHub Pages → Run workflow**를 실행해요.
5. build·Pages artifact·deploy 성공과 출력된 실제 주소에서 직접 진입·새로고침·PDF를 확인해요.

workflow는 `actions/configure-pages`의`base_path`·`base_url`을 읽어요.
기본 프로젝트 주소는 `https://jeamxn.github.io/jeamxn/`이고 사용자 사이트와 커스텀 도메인은 루트일 수 있어요.
두 경우를 CI matrix에서 따로 빌드·검사해요. `pages: write`·`id-token: write`는 deploy job에만 부여해요.
외부 AI 공급자 키나 개인 GitHub 토큰을 workflow secret으로 추가할 필요 없어요.

## 커스텀 도메인

`jeamxn.dev`를 옮길 때는 Pages의 도메인 소유권 확인과 공식 안내의 DNS·HTTPS 설정을 따로 진행해요.
기존 운영을 확인하지 않고 CNAME/A/AAAA를 바꾸거나 기존 서비스를 끄지 않아요.
저장소 이름을 `jeamxn.github.io`로 바꾸는 작업도 이 설정에 포함되지 않아요.
도메인을 설정한 뒤 configure-pages가 반환한 주소와 산출물의 canonical·sitemap을 다시 확인해요.

## 로컬 확인

```sh
JEAMXN_BASE_PATH=/jeamxn/ JEAMXN_SITE_URL=https://jeamxn.github.io/jeamxn pnpm build
node scripts/serve-static.mjs --port 5414 --base /jeamxn/
QA_BASE_URL=http://127.0.0.1:5414/jeamxn pnpm test:pages
```

`404.html`은 진짜404응답용이에요. 임의 주소를 index로 강제 리다이렉트하는 방식은 사용하지 않아요.
현재 공개 상세 주소는 모두 프리렌더해요. 새 route가 생기면 core와 프리렌더·정적 검사 목록을 함께 바꿔요.

## 롤백

문제가 있는 변경을 되돌려 main에서 검증 workflow와 Pages 배포를 다시 실행해요.
로컬 성공을 실제 원격 deploy 성공으로 보고하지 않아요. 기존 root Compose는 선택적 정적 컨테이너로
남아 있지만 GitHub Pages는 그 파일이나 nginx 서버를 실행하지 않아요.
