import type { Portfolio } from "@jeamxn/contract";
import { Link } from "react-router";
import { Portrait } from "~/shared/widget/portrait";
import { ProjectScene } from "~/shared/widget/project-scene";
import { OtherWork } from "./other-work";
import { TroubleLedger } from "./trouble-ledger";
import "./home.css";

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
  const products = data.projects
    .filter((p) => p.featured && p.slug !== "pfct")
    .sort((a, b) => ["ara", "dipull"].indexOf(a.slug) - ["ara", "dipull"].indexOf(b.slug));
  return (
    <div className="home-v2">
      <section className="hv-hero" aria-labelledby="hero-title">
        <p className="hv-hello">안녕하세요, {profile.name}입니다.</p>
        <h1 id="hero-title" className="hv-title">
          <span>기술보다</span>
          <span>아이디어를</span>
        </h1>
        <div className="hv-hero-foot">
          <p className="hv-lead">
            서비스로 더 많은 사람들을 행복하게 만들어주고 싶어요. 학교에서 친구들의 불편을 고치던
            일이, 지금은 동료들의 수작업을 줄이는 일로 이어졌어요.
          </p>
          <Portrait src={profile.portrait} className="hv-portrait" priority />
        </div>
      </section>

      <section className="hv-ledger" aria-labelledby="ledger-title">
        <div className="hv-ledger-head">
          <h2 id="ledger-title">
            불편했던 것과
            <br />
            그래서 만든 것
          </h2>
          <p>만든 것마다, 그 전에 누군가 불편해하던 일이 있었어요.</p>
        </div>
        <TroubleLedger />
      </section>

      <section className="hv-invite" aria-labelledby="invite-title">
        <h2 id="invite-title">저의 이야기를 한 번 들어볼래요?</h2>
        <p>학교 인트라넷부터 ara까지, 스크롤을 따라 한 문장씩 읽는 이야기예요.</p>
        <Link className="hv-pill" to="/story">
          이야기 들어보기
        </Link>
      </section>

      <section id="work" className="selected-work hv-work" aria-labelledby="work-title">
        <div className="hv-section-head">
          <h2 id="work-title">대표 작업</h2>
          <Link to="/work">전체 작업 기록 보기</Link>
        </div>
        {products.map((project) => (
          <article className={`featured featured--${project.slug} hv-product`} key={project.slug}>
            <div className="hv-product-head">
              <Link to={`/work/${project.slug}`} className="project-name">
                <h3 translate="no">{project.name}</h3>
              </Link>
              <p className="project-period">{project.period}</p>
            </div>
            <Link
              to={`/work/${project.slug}`}
              className="featured-image"
              aria-label={`${project.name} 프로젝트 자세히 보기`}
            >
              <ProjectScene project={project} />
            </Link>
            <div className="featured-copy hv-product-copy">
              <p className="project-subtitle">{project.subtitle}</p>
              <div>
                <p className="project-summary">{project.summary}</p>
                <p className="project-role">{project.role}</p>
                <Link className="hv-text-link" to={`/work/${project.slug}`}>
                  {project.name} 이야기 읽기
                </Link>
              </div>
            </div>
          </article>
        ))}
        {pfct && (
          <article
            className="featured featured--pfct home-company hv-company"
            aria-label="PFCT 대표 작업"
          >
            <div className="hv-product-head">
              <Link to="/work/pfct" className="project-name">
                <h3 translate="no">{pfct.name}</h3>
              </Link>
              <p className="project-period">{pfct.period}</p>
            </div>
            <div className="featured-copy hv-product-copy">
              <p className="project-subtitle">동료들이 쓰는 어드민과 사내 AI를 만들어요.</p>
              <div>
                <p className="project-summary">{pfct.lead ?? pfct.summary}</p>
                <p className="project-role">{pfct.role}</p>
                <Link className="hv-text-link" to="/work/pfct">
                  PFCT의 전체 이야기
                </Link>
              </div>
            </div>
            <div className="home-company-stories hv-notes">
              {companyStories.map((section) => (
                <article key={section.id}>
                  <h4>
                    <Link to={`/work/pfct#${section.id}`}>{section.title}</Link>
                  </h4>
                  <p>{section.paragraphs[0]}</p>
                </article>
              ))}
            </div>
          </article>
        )}
        {lecture && (
          <article className="featured featured--kt-sat hv-company" aria-label="KT SAT 대표 작업">
            <div className="hv-product-head">
              <Link to={`/activity/${lecture.slug}`} className="project-name">
                <h3 translate="no">KT SAT</h3>
              </Link>
              <p className="project-period">{lecture.period}</p>
            </div>
            <div className="featured-copy hv-product-copy">
              <p className="project-subtitle">{lecture.title}</p>
              <div>
                <p className="project-summary">{lecture.lead ?? lecture.description}</p>
                <p className="project-role">임직원 AX 기초 강연 / 강연 준비 / 발표</p>
                <Link className="hv-text-link" to={`/activity/${lecture.slug}`}>
                  강연 이야기 읽기
                </Link>
              </div>
            </div>
            <div className="home-lecture-stories hv-notes">
              {lectureStories.map((section) => (
                <article key={section.id}>
                  <h4>
                    <Link to={`/activity/${lecture.slug}#${section.id}`}>{section.title}</Link>
                  </h4>
                  <p>{section.paragraphs[0]}</p>
                </article>
              ))}
            </div>
          </article>
        )}
        <OtherWork projects={data.projects} />
      </section>

      <section className="home-about hv-about" aria-labelledby="about-title">
        <h2 id="about-title">
          제가 만든 도구를
          <br />
          직접 쓰면서 다시 고쳐요.
        </h2>
        <div className="home-about-copy">
          <p>{profile.about.at(-2)}</p>
          <Link className="hv-text-link" to="/resume#introduction">
            저에 대해 더 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
