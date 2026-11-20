import { agentDemos } from "~/shared/bits/demos-desk";
import { partDemos } from "~/shared/bits/demos-parts";
import { pick, Shelf } from "~/shared/widget/desk";

const araCanvas = pick(partDemos, ["ScrubField", "ElasticSlider", "WarmTooltip"]);
const araFiles = pick(partDemos, [
  "SwipeRow",
  "FolderFloat",
  "FuseButton",
  "HoldButton",
  "Shredder",
  "AnimatedContent",
]);
const laundry = pick(partDemos, [
  "Stepper",
  "SpringCheck",
  "SlideCommit",
  "JellyRadio",
  "SloshGauge",
  "SwipeToast",
]);
const wakeup = pick(partDemos, [
  "SquishSwitch",
  "BellToggle",
  "CometDial",
  "PulseHeart",
  "PeekRating",
  "WakeSlider",
]);

/* Two records get a hands-on section of their own, laid out by what the product does.
   Nothing here is the product's real code: the pieces are rebuilt for this page, and
   the copy says so. */
export function WorkExtras({ slug }: { slug: string }) {
  if (slug === "ara")
    return (
      <section className="work-desk" aria-labelledby="work-desk-title">
        <h2 id="work-desk-title">ara에서 하는 일을 손으로</h2>
        <p>
          대화하고, 캔버스를 고치고, 문서를 정리하는 순간을 이 페이지용으로 다시 만들었어요. 실제
          ara와 AI는 연결돼 있지 않고, 누른 내용은 어디에도 저장되지 않아요.
        </p>
        <h3>에이전트와 대화하기</h3>
        <Shelf demos={agentDemos} height={220} />
        <h3>캔버스 고치기</h3>
        <Shelf demos={araCanvas} height={200} />
        <h3>문서 정리하기</h3>
        <Shelf demos={araFiles} height={220} />
      </section>
    );
  if (slug === "dipull")
    return (
      <section className="work-desk" aria-labelledby="work-desk-title">
        <h2 id="work-desk-title">Dipull에서 하던 일을 손으로</h2>
        <p>
          세탁기를 예약하고 기상송을 고르던 순간을 이 페이지용으로 다시 만들었어요. 실제 Dipull
          화면은 아니고, 누른 내용은 어디에도 저장되지 않아요.
        </p>
        <h3>세탁 예약</h3>
        <Shelf demos={laundry} height={220} />
        <h3>기상송</h3>
        <Shelf demos={wakeup} height={200} />
      </section>
    );
  return null;
}
