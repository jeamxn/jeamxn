import type { StorySection } from "@jeamxn/contract";

/** Public prose stays fully visible. The contents links are navigation, not disclosure controls. */
export function StoryReader({ sections }: { sections: StorySection[] }) {
  return (
    <div className={`story-reader${sections.length < 3 ? " story-reader--short" : ""}`}>
      {sections.length >= 3 && (
        <nav className="story-contents" aria-label="이야기 목차">
          <p>이야기 안에서</p>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="story-body">
        {sections.map((section) => (
          <section
            className="story-section"
            id={section.id}
            key={section.id}
            aria-labelledby={`${section.id}-title`}
          >
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
