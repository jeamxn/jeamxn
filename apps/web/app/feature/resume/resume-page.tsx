import type { Portfolio } from "@jeamxn/contract";
import { resumePhoto, resumeProjects } from "@jeamxn/core";
import { Icon } from "@jeamxn/icon";
import { Link } from "react-router";
import { sitePath } from "~/shared/lib/site-path";

export function ResumePage({ data }: { data: Portfolio }) {
  return (
    <div className="container resume-page">
      <header className="resume-heading">
        <div>
          <p>이력</p>
          <div className="resume-identity">
            <img
              className="resume-id-photo"
              src={sitePath(resumePhoto.src)}
              width={resumePhoto.width}
              height={resumePhoto.height}
              alt={resumePhoto.alt}
              loading="eager"
              fetchPriority="high"
            />
            <div className="resume-name">
              <h1>
                {data.profile.name}
                <span translate="no">{data.profile.nameEn}</span>
              </h1>
              <p className="resume-intro">{data.profile.headline}</p>
            </div>
          </div>
        </div>
        <a
          className="button button--solid"
          href={sitePath("/resume.pdf")}
          download="Jeamin-Choi-Resume.pdf"
        >
          PDF 내려받기
          <Icon name="download" size={20} />
        </a>
      </header>
      <div className="resume-contact">
        <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a>
        <a href={data.profile.github} target="_blank" rel="noreferrer">
          GitHub <Icon name="arrow-up-right" size={17} />
          <span className="sr-only">(새 탭)</span>
        </a>
      </div>
      <p className="resume-profile">{data.profile.intro}</p>
      <Link className="text-link resume-archive-link" to="/work">
        모든 작업 기록 보기 <Icon name="arrow-right" size={18} />
      </Link>
      <section
        className="resume-section resume-introduction"
        id="introduction"
        aria-labelledby="resume-introduction-title"
      >
        <h2 id="resume-introduction-title">소개</h2>
        <div>
          <div className="resume-biography">
            {data.profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="resume-interests">
            <h3>화면 밖에서는</h3>
            <p>빠르게 달리는 경주, 함께 응원하는 경기, 그리고 작은 공연장의 음악을 좋아해요.</p>
            <ul aria-label="관심사">
              {data.profile.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="resume-section">
        <h2>경험</h2>
        <div>
          {data.experience.map((item) => (
            <article className="resume-item" key={`${item.period}-${item.team}`}>
              <p className="resume-date">{item.period}</p>
              <div>
                <h3>
                  {item.company}
                  <span>{item.team}</span>
                </h3>
                <p className="resume-role">{item.role}</p>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>주요 작업</h2>
        <div>
          {resumeProjects(data.projects).map((project) => (
            <article className="resume-item" key={project.slug}>
              <p className="resume-date">{project.period}</p>
              <div>
                <h3>
                  <Link to={`/work/${project.slug}`} translate="no">
                    {project.name}
                    <Icon name="arrow-up-right" size={18} />
                  </Link>
                </h3>
                <p className="resume-role">{project.role}</p>
                <p>{project.summary}</p>
                <p className="resume-note">{project.status}</p>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>교육</h2>
        <div>
          {data.education.map((item) => (
            <article className="resume-item" key={item.school}>
              <p className="resume-date">{item.period}</p>
              <div>
                <h3>{item.school}</h3>
                <p>
                  {item.major} / {item.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>활동</h2>
        <div>
          {data.activities.map((item) => (
            <article className="resume-item" key={item.title}>
              <p className="resume-date">{item.period}</p>
              <div>
                <h3>
                  {item.slug ? (
                    <Link to={`/activity/${item.slug}`}>
                      {item.title}
                      <Icon name="arrow-up-right" size={18} />
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="resume-role">
                  {item.featured ? "대표 활동 / " : ""}
                  {item.organization}
                </p>
                <p>{item.description}</p>
                {item.slug && (
                  <Link className="text-link resume-story-link" to={`/activity/${item.slug}`}>
                    강연 이야기 읽기 <Icon name="arrow-right" size={17} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>수상 / 자격 / 참가</h2>
        <div>
          {data.awards.map((item) => (
            <article className="resume-item resume-item--compact" key={item.title}>
              <p className="resume-date">{item.year}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
                <span className="resume-note">
                  {item.kind === "award"
                    ? "수상"
                    : item.kind === "participation"
                      ? "참가"
                      : "자격 / 인증"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
