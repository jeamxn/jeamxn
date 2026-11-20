import type { Portfolio } from "@jeamxn/contract";
import { Bit, usePrefersReducedMotion } from "~/shared/widget/bit";

/* Tags that describe a topic rather than a tool are left out of the strip. */
const topics = new Set([
  "AI",
  "Education",
  "CLI",
  "Maps",
  "Hackathon",
  "Documentation",
  "Auth",
  "API",
  "IoT",
  "CI",
  "Canvas",
  "Geolocation",
  "Image generation",
  "Data visualization",
  "Browser extension",
  "Cron",
]);

function topTools(data: Portfolio, limit: number) {
  const counts = new Map<string, number>();
  for (const project of data.projects)
    for (const tag of project.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts]
    .filter(([tag]) => !topics.has(tag))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

/** Three counts taken from the records themselves; they roll up when scrolled into view. */
export function ResumeTally({ data }: { data: Portfolio }) {
  const tools = new Set(data.projects.flatMap((project) => project.tags)).size;
  const items = [
    { label: "작업 기록", value: data.projects.length, unit: "건" },
    { label: "써 본 기술과 주제", value: tools, unit: "가지" },
    { label: "수상 / 자격 / 참가", value: data.awards.length, unit: "건" },
  ];
  return (
    <dl className="resume-tally">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>
            <Bit
              name="CountUp"
              className="resume-tally-number"
              keep
              placeholder={item.value}
              fallback={item.value}
              render={(bit) => <bit.default to={item.value} from={0} duration={1.4} mode="roll" />}
            />
            <span>{item.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The tools that show up most across the work records, as a slow strip. */
export function ResumeTools({ data }: { data: Portfolio }) {
  const reduced = usePrefersReducedMotion();
  const tools = topTools(data, 12);
  const list = (
    <ul className="resume-tools-list">
      {tools.map((tool) => (
        <li key={tool} translate="no">
          {tool}
        </li>
      ))}
    </ul>
  );
  return (
    <section className="resume-tools" aria-labelledby="resume-tools-title">
      <h2 id="resume-tools-title">자주 쓴 기술</h2>
      {reduced ? (
        list
      ) : (
        <Bit
          name="LogoLoop"
          className="resume-tools-loop"
          placeholder={list}
          fallback={list}
          render={(bit) => (
            <bit.default
              logos={tools.map((tool) => ({
                node: (
                  <span className="resume-tools-word" translate="no">
                    {tool}
                  </span>
                ),
                title: tool,
              }))}
              speed={46}
              direction="left"
              logoHeight={28}
              gap={44}
              hoverSpeed={0}
              fadeOut
              fadeOutColor="#f7f7f7"
              ariaLabel="자주 쓴 기술"
            />
          )}
        />
      )}
    </section>
  );
}
