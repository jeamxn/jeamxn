import type { Activity } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { Link } from "react-router";
import { StoryReader } from "~/shared/widget/story-reader";

export function ActivityPage({ activity }: { activity: Activity }) {
  return (
    <article className="activity-page container">
      <header className="activity-heading">
        <Link to="/resume" className="text-link back-link">
          이력과 활동 <Icon name="arrow-right" size={18} />
        </Link>
        <p className="activity-meta">
          {activity.organization} / {activity.period}
        </p>
        <h1>{activity.title}</h1>
      </header>
      <div className="case-intro">
        {activity.lead && <p className="case-lead">{activity.lead}</p>}
        <p className="case-summary">{activity.description}</p>
      </div>
      {activity.sections?.length ? <StoryReader sections={activity.sections} /> : null}
      <div className="activity-return">
        <Link to="/resume" className="text-link">
          다른 경험과 활동 살펴보기 <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </article>
  );
}
