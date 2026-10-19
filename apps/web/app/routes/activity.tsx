import { portfolio } from "@jeamxn/core";
import { Link, useParams } from "react-router";
import { ActivityPage } from "~/feature/activity/activity-page";
import { pageMeta } from "~/shared/lib/meta";
import type { Route } from "./+types/activity";

export function meta({ params }: Route.MetaArgs) {
  const activity = portfolio.activities.find((item) => item.slug === params.slug);
  return pageMeta(
    activity?.title ?? "활동을 찾지 못했어요",
    activity?.description ?? "이력과 활동에서 다른 이야기를 살펴보세요.",
    activity ? `/activity/${activity.slug}` : "/resume",
  );
}
export default function Activity() {
  const { slug } = useParams();
  const activity = portfolio.activities.find((item) => item.slug === slug);
  return activity ? (
    <ActivityPage activity={activity} />
  ) : (
    <div className="container missing-page">
      <h1>이 활동은 찾지 못했어요.</h1>
      <p>주소를 확인하거나 이력에서 다른 이야기를 살펴보세요.</p>
      <Link className="button button--solid" to="/resume">
        이력과 활동 보기
      </Link>
    </div>
  );
}
