import { sitePath } from "~/shared/lib/site-path";

export function Portrait({
  src,
  className = "",
  priority = false,
}: {
  src: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`portrait ${className}`}>
      <img
        src={sitePath(src)}
        srcSet={`${sitePath("/images/portrait-small.webp")} 720w, ${sitePath("/images/portrait.webp")} 1800w`}
        sizes="(max-width: 600px) 82vw, 50vw"
        alt="최재민의 인물 사진"
        width="1800"
        height="1200"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}
