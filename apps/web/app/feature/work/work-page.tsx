import type { Project } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { Link } from "react-router";
import { safeHref } from "~/shared/lib/meta";
import { projectMedia } from "~/shared/lib/project-media";
import { ProjectScene } from "~/shared/widget/project-scene";

export function WorkPage({ project, next }: { project: Project; next?: Project }) {
  const media = projectMedia[project.slug];
  return (
    <article className="work-page container">
      <header className="work-heading">
        <Link to="/#work" className="text-link back-link">
          만든 제품 <Icon name="arrow-right" size={18} />
        </Link>
        <div className="work-title-line">
          <h1 translate="no">{project.name}</h1>
          <span>{project.category}</span>
        </div>
        <p className="work-subtitle">{project.subtitle}</p>
        <dl className="work-meta">
          <div>
            <dt>기간</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>역할</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>현재 상태</dt>
            <dd>{project.status}</dd>
          </div>
        </dl>
      </header>
      {project.image ? <ProjectScene project={project} priority /> : null}
      <section className="work-story">
        <h2>어떻게 시작했나요?</h2>
        <div>
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      {project.highlights.length > 0 && (
        <section className="work-highlights">
          <h2>만들며 고민한 것들</h2>
          <div>
            {project.highlights.map((highlight) => (
              <div className="highlight" key={highlight.title}>
                <h3>{highlight.title}</h3>
                <p>{highlight.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {media && (
        <section className="product-gallery" aria-labelledby="gallery-title">
          <div className="gallery-intro">
            <h2 id="gallery-title">{media.heading}</h2>
            <p>{media.description}</p>
          </div>
          <div className={`gallery-images gallery-images--${project.slug}`}>
            {media.items.map((item) => (
              <figure key={item.src}>
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                />
                <figcaption>가상 데이터로 재구성한 화면</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      {project.slug === "ara" && (
        <figure className="product-video">
          <video
            controls
            playsInline
            preload="none"
            poster="/images/ara-preview.webp"
            width="1440"
            height="900"
            aria-label="가상 데이터로 만든 ara 제품 예시 영상"
          >
            <source src="/images/ara-demo.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/captions/ara-demo.vtt"
              srcLang="ko"
              label="한국어 설명"
              default
            />
            이 브라우저는 영상을 지원하지 않습니다. 위의 제품 예시 화면을 살펴보세요.
          </video>
          <figcaption>
            가상 데이터로 재구성한 무음 화면 예시 · 재생 버튼을 눌러 살펴볼 수 있습니다.
          </figcaption>
        </figure>
      )}
      <section className="work-tools">
        <h2>제품에 사용한 기술</h2>
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag} translate="no">
              {tag}
            </li>
          ))}
        </ul>
      </section>
      {project.links.length > 0 && (
        <section className="work-links">
          <h2>더 살펴보기</h2>
          <div>
            {project.links.map((link) => (
              <a
                key={link.href}
                href={safeHref(link.href)}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                {link.label}
                <Icon name="arrow-up-right" size={20} />
                <span className="sr-only">(새 탭)</span>
              </a>
            ))}
          </div>
        </section>
      )}
      {next && (
        <Link to={`/work/${next.slug}`} className="next-work">
          <span>다음 이야기</span>
          <strong translate="no">{next.name}</strong>
          <Icon name="arrow-up-right" size={48} />
        </Link>
      )}
    </article>
  );
}
