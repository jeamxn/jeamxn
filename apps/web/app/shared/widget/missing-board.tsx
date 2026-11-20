import { partDemos } from "~/shared/bits/demos-parts";
import { navDemos } from "~/shared/bits/demos-screens";
import { One, pick, Shelf } from "~/shared/widget/desk";

const [menu] = pick(navDemos, ["FlowingMenu"]);
const exits = pick(partDemos, ["SpecularButton", "StarBorder"]);
const toys = pick(partDemos, ["DodgeField", "CodeSlots", "SlingButton", "FlyingButton", "Counter"]);

/** On the not-found page: the site's real destinations, and a few things to fiddle with. */
export function MissingBoard() {
  return (
    <section className="missing-board" aria-labelledby="missing-board-title">
      <h2 id="missing-board-title">여기서 골라 가세요</h2>
      <One demo={menu} height={420} />
      <Shelf demos={exits} height={110} className="missing-exits" />
      <h2>온 김에 놀다 가세요</h2>
      <Shelf demos={toys} height={220} />
    </section>
  );
}
