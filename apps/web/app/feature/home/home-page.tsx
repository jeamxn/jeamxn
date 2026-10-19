import type { Portfolio } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { Link } from "react-router";
import { ProjectScene } from "~/shared/widget/project-scene";
import { OtherWork } from "./other-work";
import { ScrollStory } from "./scroll-story";

export function HomePage({ data }: { data: Portfolio }) {
  const { profile } = data;
  const lecture = data.activities.find(
    (activity) => activity.slug === "kt-sat-ax" && activity.featured,
  );
  const lectureStories = ["judgment", "workflow", "responsibility"].flatMap(
    (id) => lecture?.sections?.find((section) => section.id === id) ?? [],
  );
  const pfct = data.projects.find((project) => project.slug === "pfct");
  const companyStories = [
    "admin-foundation",
    "dpd-workspace",
    "ax-workflow",
    "ai-waf-monitoring",
  ].flatMap((id) => pfct?.sections?.find((section) => section.id === id) ?? []);
  return (
    <>
      <ScrollStory data={data} />
      <section id="work" className="selected-work container" aria-labelledby="work-title">
        <div className="section-intro">
          <h2 id="work-title">
            친구와 동료에게
            <br />
            필요한 걸 만들어요.
          </h2>
          <p>
            학교에서는 기상송 신청과 세탁 예약을 만들었어요.
            <br />
            지금은 동료들의 업무 화면과 AI 도구를 만들고 있어요.
          </p>
        </div>
        {data.projects
          .filter((p) => p.featured && p.slug !== "pfct")
          .sort((a, b) => ["ara", "dipull"].indexOf(a.slug) - ["ara", "dipull"].indexOf(b.slug))
          .map((project) => (
            <article className={`featured featured--${project.slug}`} key={project.slug}>
              <Link
                to={`/work/${project.slug}`}
                className="featured-image"
                aria-label={`${project.name} 프로젝트 자세히 보기`}
              >
                <ProjectScene project={project} />
              </Link>
              <div className="featured-copy">
                <p className="project-period">{project.period}</p>
                <Link to={`/work/${project.slug}`} className="project-name">
                  <h3 translate="no">{project.name}</h3>
                  <span className="round-arrow">
                    <Icon name="arrow-up-right" size={27} />
                  </span>
                </Link>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-summary">{project.summary}</p>
                <p className="project-role">{project.role}</p>
                <Link className="text-link" to={`/work/${project.slug}`}>
                  프로젝트 이야기 <Icon name="arrow-right" size={20} />
                </Link>
              </div>
            </article>
          ))}
        {pfct && (
          <article className="featured featured--pfct home-company" aria-label="PFCT 대표 작업">
            <div className="featured-copy home-company-heading">
              <p className="project-period">{pfct.period}</p>
              <Link to="/work/pfct" className="project-name">
                <h3 translate="no">{pfct.name}</h3>
                <span className="round-arrow">
                  <Icon name="arrow-up-right" size={27} />
                </span>
              </Link>
              <p className="project-subtitle">동료들이 쓰는 어드민과 사내 AI를 만들어요.</p>
              <p className="project-summary">{pfct.lead ?? pfct.summary}</p>
              <p className="project-role">{pfct.role}</p>
              <Link className="text-link" to="/work/pfct">
                PFCT의 전체 이야기 <Icon name="arrow-right" size={20} />
              </Link>
            </div>
            <div className="home-company-stories">
              {companyStories.map((section) => (
                <article key={section.id}>
                  <h4>
                    <Link to={`/work/pfct#${section.id}`}>
                      {section.title}
                      <Icon name="arrow-up-right" size={20} />
                    </Link>
                  </h4>
                  <p>{section.paragraphs[0]}</p>
                </article>
              ))}
            </div>
          </article>
        )}
        {lecture && (
          <article className="featured featured--kt-sat" aria-label="KT SAT 대표 작업">
            <div className="featured-copy">
              <p className="project-period">{lecture.period}</p>
              <Link to={`/activity/${lecture.slug}`} className="project-name">
                <h3 translate="no">KT SAT</h3>
                <span className="round-arrow">
                  <Icon name="arrow-up-right" size={27} />
                </span>
              </Link>
              <p className="project-subtitle">{lecture.title}</p>
              <p className="project-summary">{lecture.lead ?? lecture.description}</p>
              <p className="project-role">임직원 AX 기초 강연 / 강연 준비 / 발표</p>
              <Link className="text-link" to={`/activity/${lecture.slug}`}>
                강연 이야기 읽기 <Icon name="arrow-right" size={20} />
              </Link>
            </div>
            <div className="home-lecture-stories">
              {lectureStories.map((section) => (
                <article key={section.id}>
                  <h4>
                    <Link to={`/activity/${lecture.slug}#${section.id}`}>
                      {section.title}
                      <Icon name="arrow-up-right" size={20} />
                    </Link>
                  </h4>
                  <p>{section.paragraphs[0]}</p>
                </article>
              ))}
            </div>
          </article>
        )}
        <OtherWork projects={data.projects} />
      </section>
      <section className="home-about container">
        <div>
          <h2>
            제가 만든 도구를
            <br />
            직접 쓰면서
            <br />
            다시 고쳐요.
          </h2>
          <Link className="text-link" to="/resume#introduction">
            저에 대해 더 보기 <Icon name="arrow-right" size={20} />
          </Link>
        </div>
        <div className="home-about-copy">
          <p>{profile.about.at(-1)}</p>
          <p>ara에서 문서와 발표 자료를 직접 만들면서 편집과 내보내기 과정의 문제를 찾고 있어요.</p>
        </div>
      </section>
    </>
  );
}
