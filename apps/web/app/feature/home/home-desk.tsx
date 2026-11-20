import { logoDemos } from "~/shared/bits/demos-desk";
import { partDemos } from "~/shared/bits/demos-parts";
import { screenDemos } from "~/shared/bits/demos-screens";
import { typeDemos } from "~/shared/bits/demos-type";
import { pick, Shelf, Turner } from "~/shared/widget/desk";

const cards = pick(partDemos, ["ElectricBorder", "BorderGlow", "SpotlightCard"]);
const bento = pick(partDemos, ["MagicBento"]);
const words = pick(typeDemos, [
  "RotatingText",
  "SplitFlapText",
  "TextCursor",
  "MaskedHeading",
  "FallingText",
  "ScrollFloat",
  "TextLoop",
]);
const front = ["MetallicPaint", "ElectricLogo", "StickerPeel"];
const markRow = [...pick(logoDemos, front), ...pick(partDemos, ["PixelCard"])];
/* The rest draw with WebGL; one at a time keeps the page well under the browser's cap. */
const markMore = logoDemos.filter(
  (demo) => ![...front, "Lanyard", "LogoLoop", "ElasticMesh"].includes(demo.name),
);

/** What was made, at a glance: three products and the parts they are known for. */
export function HomeGlance() {
  return (
    <section className="home-desk container" aria-labelledby="home-glance-title">
      <div className="home-desk-heading">
        <h2 id="home-glance-title">한눈에 보기</h2>
        <p>만든 제품과 그 안에서 맡은 일을 짧게 모았어요.</p>
      </div>
      <Shelf demos={cards} height={220} bare />
      <Shelf demos={bento} height={360} bare className="home-glance-bento" />
    </section>
  );
}

/** The product screens from the work records, shown one way at a time. */
export function HomeScreens() {
  return (
    <section className="home-desk container" aria-labelledby="home-screens-title">
      <div className="home-desk-heading">
        <h2 id="home-screens-title">화면으로 보기</h2>
        <p>ara와 Dipull의 화면이에요. 모두 가상 데이터로 실행한 화면이에요.</p>
      </div>
      <Turner demos={screenDemos} height={520} />
    </section>
  );
}

/** The site's own sentences and project names, set in motion. Decorative. */
export function HomeWords() {
  return (
    <div className="home-desk home-desk--words container">
      <Shelf demos={words} height={200} bare />
    </div>
  );
}

/** The asterisk beside the name, in other materials. */
export function HomeMark() {
  return (
    <section className="home-desk container" aria-labelledby="home-mark-title">
      <div className="home-desk-heading">
        <h2 id="home-mark-title" translate="no">
          jeamxn*
        </h2>
        <p>이름 옆에 붙이는 별표예요. 금속과 유리, 빛으로도 만들어 봤어요.</p>
      </div>
      <Shelf demos={markRow} height={300} className="home-mark-row" />
      <Turner demos={markMore} height={400} className="home-mark-more" />
    </section>
  );
}
