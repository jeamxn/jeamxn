import { photoDemos } from "~/shared/bits/demos-pointer";
import { Turner } from "~/shared/widget/desk";

/** The portrait, shown one way at a time. */
export function ResumePhoto() {
  return (
    <section className="resume-section resume-photo" aria-labelledby="resume-photo-title">
      <h2 id="resume-photo-title">사진</h2>
      <Turner demos={photoDemos} height={460} className="desk-narrow" />
    </section>
  );
}
