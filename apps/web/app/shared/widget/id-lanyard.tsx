import { useEffect, useRef, useState } from "react";
import { sitePath } from "~/shared/lib/site-path";
import { Bit } from "~/shared/widget/bit";

const W = 800;
const H = 1125; // the card is 1.6 : 2.25
const ink = "#161616";
const cobalt = "#2459d3";
const face = '"Interlude Variable", -apple-system, "Apple SD Gothic Neo", sans-serif';

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`image ${src}`));
    image.src = src;
  });
}

function sheet() {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d canvas");
  ctx.textBaseline = "alphabetic";
  return { canvas, ctx };
}

/* The badge is drawn here, at view time, from the same portrait and type the site
   already ships, so there is no separate card image to keep in sync. */
async function drawBadge({ name, nameEn, line }: { name: string; nameEn: string; line: string }) {
  const copy = `${name}${nameEn}${line}jeamxn.dev*me@`;
  await Promise.all([
    document.fonts.load(`600 92px ${face}`, copy),
    document.fonts.load(`500 40px ${face}`, copy),
  ]).catch(() => undefined);
  const photo = await loadImage(sitePath("/images/portrait-small.webp"));

  const front = sheet();
  let ctx = front.ctx;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = cobalt;
  ctx.fillRect(0, 0, W, 214);
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 46px ${face}`;
  ctx.fillText("jeamxn", 56, 176);
  ctx.font = `600 56px ${face}`;
  ctx.fillText("*", 56 + 172, 186);
  ctx.font = `500 26px ${face}`;
  ctx.textAlign = "right";
  ctx.fillText("2026", W - 56, 174);
  ctx.textAlign = "left";

  const box = { x: 56, y: 262, w: W - 112, h: 500, r: 28 };
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(box.x, box.y, box.w, box.h, box.r);
  ctx.clip();
  const scale = Math.max(box.w / photo.naturalWidth, box.h / photo.naturalHeight);
  const pw = photo.naturalWidth * scale;
  const ph = photo.naturalHeight * scale;
  ctx.drawImage(photo, box.x + (box.w - pw) / 2, box.y + (box.h - ph) / 2, pw, ph);
  ctx.restore();

  ctx.fillStyle = ink;
  ctx.font = `600 92px ${face}`;
  ctx.fillText(name, 54, 884);
  const nameWidth = ctx.measureText(name).width;
  ctx.fillStyle = "#555555";
  ctx.font = `500 38px ${face}`;
  ctx.fillText(nameEn, 54 + nameWidth + 22, 884);
  ctx.fillStyle = ink;
  ctx.font = `500 38px ${face}`;
  ctx.fillText(line, 56, 954);
  ctx.fillStyle = "#555555";
  ctx.font = `500 28px ${face}`;
  ctx.fillText("jeamxn.dev", 56, 1062);
  ctx.fillStyle = cobalt;
  ctx.font = `600 150px ${face}`;
  ctx.textAlign = "right";
  ctx.fillText("*", W - 48, 1128);

  const back = sheet();
  ctx = back.ctx;
  ctx.fillStyle = ink;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = cobalt;
  ctx.textAlign = "center";
  ctx.font = `600 620px ${face}`;
  ctx.fillText("*", W / 2, 900);
  ctx.fillStyle = "#f7f7f7";
  ctx.font = `500 40px ${face}`;
  ctx.fillText("me@jeamxn.dev", W / 2, 1010);
  ctx.fillStyle = "#8fa6e8";
  ctx.font = `500 28px ${face}`;
  ctx.fillText("jeamxn.dev", W / 2, 1060);

  return {
    front: front.canvas.toDataURL("image/jpeg", 0.9),
    back: back.canvas.toDataURL("image/jpeg", 0.9),
  };
}

/** A staff badge on a lanyard that can be grabbed, swung and thrown. */
export function IdLanyard({
  name,
  nameEn,
  line = "제품을 만드는 사람",
  className = "",
  anchor = "center",
}: {
  name: string;
  nameEn: string;
  line?: string;
  className?: string;
  anchor?: "left" | "center" | "right";
}) {
  const box = useRef<HTMLDivElement>(null);
  const [faces, setFaces] = useState<{ front: string; back: string } | null>(null);

  useEffect(() => {
    const node = box.current;
    if (!node) return undefined;
    let alive = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        drawBadge({ name, nameEn, line }).then(
          (drawn) => alive && setFaces(drawn),
          () => undefined,
        );
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [name, nameEn, line]);

  return (
    <div ref={box} className={`id-lanyard ${className}`.trim()}>
      <p className="sr-only">
        {name}({nameEn})의 사원증 모양 카드예요. {line}이라고 적혀 있어요.
      </p>
      {faces && (
        <Bit
          name="Lanyard"
          className="id-lanyard-stage"
          decorative
          fallback={<img className="id-lanyard-flat" src={faces.front} alt="" />}
          render={(bit) => (
            <bit.default
              frontImage={faces.front}
              backImage={faces.back}
              imageFit="cover"
              cardColor="#ffffff"
              finish="glossy"
              cornerRadius={0.32}
              size={0.62}
              anchor={anchor}
              strapLength={0.42}
              strapColor={cobalt}
              strapWidth={0.6}
              metal="silver"
              breeze={0.45}
            />
          )}
        />
      )}
      <p className="id-lanyard-hint" aria-hidden="true">
        사원증을 잡고 끌거나 던져 보세요.
      </p>
    </div>
  );
}
