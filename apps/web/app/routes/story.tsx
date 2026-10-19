import { portfolio } from "@jeamxn/core";
import { Link } from "react-router";
import { ScrollStory } from "~/feature/home/scroll-story";
import { pageMeta } from "~/shared/lib/meta";

export function meta() {
  return pageMeta(
    "이야기",
    "학교 인트라넷부터 회사의 업무 도구, 친구와 만드는 에이전트까지 스크롤로 따라가는 이야기예요.",
    "/story",
  );
}

/** The scroll-linked 3D story moved here from the homepage; its skip link lands on #work. */
export default function Story() {
  return (
    <>
      <ScrollStory data={portfolio} />
      <section id="work" className="story-exit container" aria-labelledby="story-exit-title">
        <h2 id="story-exit-title" className="story-exit-title">
          이야기를 끝까지 읽어주셔서 고마워요.
        </h2>
        <p className="story-exit-text">
          만든 것들은 첫 화면과 작업 기록에서 더 자세히 볼 수 있어요.
        </p>
        <div className="story-exit-links">
          <Link className="story-exit-link" to="/#work">
            대표 작업 보기
          </Link>
          <Link className="story-exit-link" to="/work">
            전체 작업 기록
          </Link>
        </div>
      </section>
    </>
  );
}
