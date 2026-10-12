import type { Portfolio } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { Link } from "react-router";
import { Portrait } from "~/shared/widget/portrait";
import { ProjectScene } from "~/shared/widget/project-scene";

export function HomePage({ data, onAsk }: { data: Portfolio; onAsk: () => void }) {
  const { profile } = data;
  const pfct = data.projects.find((project) => project.slug === "pfct");
  const companyStories = ["admin-foundation", "dpd-workspace", "meeting-workflow"].flatMap(
    (id) => pfct?.sections?.find((section) => section.id === id) ?? [],
  );
  const headlineLines = profile.headline
    .replace(/,\s*/u, ",\n")
    .replace(/ (\S+)$/u, "\n$1")
    .split("\n");
  const nameWords = profile.nameEn.split(" ");
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-greeting">제품을 만드는 {profile.name}입니다.</p>
          <h1 id="hero-title">
            {headlineLines.map((line, index) => (
              <span className="hero-title-line" key={line}>
                {line}
                {index < headlineLines.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="hero-intro">{profile.intro}</p>
          <a className="text-link" href="#work">
            만든 제품 살펴보기 <Icon name="arrow-down" size={20} />
          </a>
        </div>
        <Portrait src={profile.portrait} className="hero-portrait" priority />
        <p className="hero-name" translate="no">
          {nameWords.map((word) => (
            <span key={word}>{word} </span>
          ))}
          <span className="name-period" aria-hidden="true">
            .
          </span>
        </p>
        <div className="hero-bottom">
          <span>아이디어를 제품으로 만드는 사람</span>
          <span>
            현재 {data.experience[0]?.company}에서, 그리고{" "}
            {data.projects.find((project) => project.slug === "ara")?.name}에서
          </span>
        </div>
      </section>
      <section id="work" className="selected-work container" aria-labelledby="work-title">
        <div className="section-intro">
          <h2 id="work-title">
            직접 쓰고,
            <br />
            함께 고칩니다.
          </h2>
          <p>
            일상의 작은 불편에서 시작했습니다.
            <br />
            지금도 쓰는 사람의 곁에서 제품을 다듬습니다.
          </p>
        </div>
        {data.projects
          .filter((p) => p.featured)
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
          <section className="home-company" aria-labelledby="company-story-title">
            <div className="home-company-heading">
              <p>
                {pfct.period} · {pfct.role}
              </p>
              <h3 id="company-story-title">
                {pfct.name}에서
                <br />
                동료들과 만든 제품
              </h3>
              <p className="home-company-lead">{pfct.lead ?? pfct.summary}</p>
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
          </section>
        )}
        <div className="other-work">
          <h3>그리고 이런 것들을 만들었습니다.</h3>
          {data.projects
            .filter((p) => !p.featured && p.slug !== "pfct")
            .map((project) => (
              <Link to={`/work/${project.slug}`} className="work-row" key={project.slug}>
                <span className="work-row-name" translate="no">
                  {project.name}
                </span>
                <span className="work-row-summary">{project.summary}</span>
                <span className="work-row-period">{project.period}</span>
                <Icon name="arrow-up-right" size={23} />
              </Link>
            ))}
        </div>
      </section>
      {data.activities.find((item) => item.slug === "kt-sat-ax") && (
        <section className="home-activity container">
          {data.activities
            .filter((item) => item.slug === "kt-sat-ax")
            .map((item) => (
              <Link to={`/activity/${item.slug}`} key={item.slug}>
                <span>{item.organization}에서 나눈 이야기</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="text-link">
                  강연 이야기 읽기 <Icon name="arrow-right" size={20} />
                </span>
              </Link>
            ))}
        </section>
      )}
      <section className="home-about container">
        <div>
          <h2>
            기술 하나보다,
            <br />
            제품 하나로
            <br />
            이야기하고 싶습니다.
          </h2>
          <Link className="text-link" to="/about">
            저에 대해 더 보기 <Icon name="arrow-right" size={20} />
          </Link>
        </div>
        <div className="home-about-copy">
          <p>{profile.about.at(-1)}</p>
          <p>함께 일하는 동료에게, 학교의 친구에게, 그리고 제가 직접 쓰고 싶은 제품을 만듭니다.</p>
          <button type="button" className="ask-inline" onClick={onAsk}>
            <Icon name="chat" size={22} />
            <span>궁금한 점이 있다면 질문해 보세요.</span>
            <Icon name="arrow-up-right" size={20} />
          </button>
        </div>
      </section>
    </>
  );
}
