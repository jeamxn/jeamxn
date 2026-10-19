import { portfolio } from "@jeamxn/core";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ResumePage } from "~/feature/resume/resume-page";
import { pageMeta } from "~/shared/lib/meta";

export function meta() {
  return pageMeta(
    "이력",
    "최재민의 소개와 경력, 주요 작업, 교육과 활동을 한곳에 모았어요.",
    "/resume",
  );
}

export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    void navigate("/resume#introduction", { replace: true });
  }, [navigate]);
  // Keep the legacy static URL useful before hydration and with JavaScript off.
  return <ResumePage data={portfolio} />;
}
