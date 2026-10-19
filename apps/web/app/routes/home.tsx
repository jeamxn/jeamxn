import { portfolio } from "@jeamxn/core";
import { HomePage } from "~/feature/home/home-page";
import { pageMeta } from "~/shared/lib/meta";
export function meta() {
  return pageMeta("제품을 만드는 최재민", portfolio.profile.intro);
}
export default function Home() {
  return <HomePage data={portfolio} />;
}
