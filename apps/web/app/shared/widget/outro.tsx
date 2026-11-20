import { portfolio } from "@jeamxn/core";
import { Icon } from "@jeamxn/icon";
import { Link } from "react-router";
import { partDemos } from "~/shared/bits/demos-parts";
import { photoDemos } from "~/shared/bits/demos-pointer";
import { navDemos } from "~/shared/bits/demos-screens";
import { dealt, One, pick } from "~/shared/widget/desk";

/* Every way onward: nine menus and two pickers, all with the site's real destinations. */
const ways = [...navDemos, ...pick(partDemos, ["GlideSelect", "BranchedMenu"])];
const small = ["GooeyNav", "PillNav", "Dock"];

/**
 * The end of a record: who made it, and where to go next. Each record is dealt its own
 * way of showing the portrait and its own kind of menu, by its place in the list.
 */
export function Outro({ order }: { order: number }) {
  const { profile } = portfolio;
  const way = dealt(ways, order, 2);
  return (
    <>
      <section className="outro-maker" aria-labelledby="outro-maker-title">
        <One demo={dealt(photoDemos, order, 5)} height={340} className="outro-maker-photo" />
        <div className="outro-maker-copy">
          <h2 id="outro-maker-title">만든 사람</h2>
          <p className="outro-maker-name">
            {profile.name} <span translate="no">{profile.nameEn}</span>
          </p>
          <p>{profile.intro}</p>
          <Link className="text-link" to="/resume">
            이력 보기 <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </section>
      <section className="outro-nav" aria-labelledby="outro-nav-title">
        <h2 id="outro-nav-title">다른 곳으로</h2>
        <One demo={way} height={small.includes(way.name) ? 200 : 400} />
      </section>
    </>
  );
}
