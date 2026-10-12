import { portfolio } from "@jeamxn/core";
import { AboutPage } from "~/feature/about/about-page";
import { pageMeta } from "~/shared/lib/meta";
export function meta() {
  return pageMeta(
    "소개",
    "필요한 것을 배우고 사람들과 함께 제품으로 완성하는 최재민의 이야기입니다.",
  );
}
export default function About() {
  return <AboutPage data={portfolio} />;
}
