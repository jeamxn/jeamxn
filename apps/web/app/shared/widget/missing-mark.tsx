import { Bit } from "~/shared/widget/bit";

/** The decorative 404 above a missing-page message; the heading stays plain text. */
export function MissingMark() {
  return (
    <Bit
      name="FuzzyText"
      className="missing-mark"
      decorative
      eager
      render={(bit) => (
        <bit.default
          fontSize="clamp(88px, 22vw, 200px)"
          fontWeight={800}
          fontFamily="Interlude Variable"
          color="#161616"
          baseIntensity={0.14}
          hoverIntensity={0.5}
        >
          404
        </bit.default>
      )}
    />
  );
}
