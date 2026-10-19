import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { Box3, Mesh, Vector3 } from "three";
import { createServer } from "vite";
import { createStoryModels } from "../app/feature/home/story-three-models.ts";

test("eight original solid models have non-flat geometry, matching names and normalized pivots", () => {
  const models = createStoryModels();
  assert.deepEqual(
    models.map((model) => model.name),
    ["music", "laundry", "calendar", "document", "chart", "data", "chat", "idea"],
  );
  let triangles = 0;
  const geometries = new Set(),
    materials = new Set();
  for (const model of models) {
    const box = new Box3().setFromObject(model, true);
    const size = box.getSize(new Vector3()),
      center = box.getCenter(new Vector3());
    assert.ok(center.length() < 1e-5, model.name);
    assert.ok(Math.abs(Math.max(size.x, size.y, size.z) - 2) < 1e-5, model.name);
    assert.ok(
      size.x > 0.4 && size.y > 0.4 && size.z > 0.25,
      `${model.name} has actual modeled depth`,
    );
    let meshes = 0;
    model.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      meshes++;
      assert.ok(object.receiveShadow || object.castShadow || object.material.transparent);
      const pos = object.geometry.getAttribute("position"),
        normal = object.geometry.getAttribute("normal");
      assert.ok(pos && normal && pos.count >= 3, object.name);
      for (const v of pos.array) assert.ok(Number.isFinite(v));
      triangles +=
        ((object.geometry.index?.count ?? pos.count) / 3) *
        (object.isInstancedMesh ? object.count : 1);
      geometries.add(object.geometry);
      for (const material of Array.isArray(object.material) ? object.material : [object.material])
        materials.add(material);
    });
    assert.ok(meshes >= 4, model.name);
  }
  assert.ok(triangles < 200000, `bounded modeled geometry ${triangles}`);
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
});

test("WebGL lazily loads a capped decorative loop independent of scroll progress", () => {
  const source = readFileSync(
    new URL("../app/feature/home/scroll-story.tsx", import.meta.url),
    "utf8",
  );
  const renderer = readFileSync(
    new URL("../app/feature/home/story-three.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /import\("\.\/story-three"\)/u);
  assert.match(source, /if \(!enhanced \|\| !threeHost.current\) return/u);
  assert.doesNotMatch(renderer, /setAnimationLoop|setInterval/u);
  assert.match(renderer, /frameInterval = 1000 \/ 20/u);
  assert.match(renderer, /elapsed >= frameInterval/u);
  assert.match(renderer, /requestAnimationFrame\(animate\)/u);
  assert.match(renderer, /cancelAnimationFrame\(pendingFrame\)/u);
  assert.match(renderer, /!document\.hidden/u);
  assert.match(renderer, /prefers-reduced-motion: reduce/u);
  assert.match(renderer, /IntersectionObserver/u);
  assert.match(renderer, /hasVisibleModels/u);
  assert.match(renderer, /contextLost = true;\s+stopMotion\(\)/u);
  assert.match(renderer, /destroyed = true;\s+stopMotion\(\)/u);
  assert.match(renderer, /intersection\?\.disconnect\(\)/u);
  assert.match(renderer, /removeEventListener\("visibilitychange", visibility\)/u);
  assert.match(renderer, /removeEventListener\("change", preference\)/u);
  assert.match(renderer, /threePose = JSON\.stringify\(stats\)/u);
  assert.match(renderer, /threeAnimatedPose = JSON\.stringify\(animatedStats\)/u);
  assert.doesNotMatch(renderer, /scrollTo|scrollBy|setBeat|setActive/u);
  assert.match(renderer, /renderer\.dispose\(\)/u);
  assert.match(renderer, /geometry\.dispose\(\)/u);
  assert.match(renderer, /material\.dispose\(\)/u);
});

test("school, Internal, AX and ara have independent main objects and meaningful sets", async () => {
  const vite = await createServer({
    configFile: false,
    resolve: { tsconfigPaths: true },
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
  const { createChapterModels } = await vite.ssrLoadModule(
    "/app/feature/home/story-chapter-models.ts",
  );
  const chapters = createChapterModels();
  await vite.close();
  assert.deepEqual(
    chapters.map((chapter) => chapter.id),
    ["intro", "dipull", "internal", "ax", "ara"],
  );
  assert.deepEqual(
    chapters.map((chapter) => chapter.models.length),
    [2, 4, 6, 8, 5],
  );
  assert.ok(chapters[1].models.some((model) => model.id === "campus"));
  assert.ok(chapters[2].models.some((model) => model.id === "shield"));
  assert.ok(chapters[2].models.some((model) => model.id === "dpd"));
  assert.ok(!chapters[3].models.some((model) => model.id === "dpd"));
  assert.ok(chapters[3].models.some((model) => model.id === "mcp-server"));
  assert.ok(chapters[3].models.some((model) => model.id === "presentation"));
  assert.deepEqual(
    chapters[3].models.map((model) => model.id),
    [
      "lily",
      "mcp-server",
      "tool-plug",
      "meeting",
      "presentation",
      "waf-radar",
      "waf-shield",
      "waf-events",
    ],
    "WAF models append to the existing AX scene without replacing its five objects",
  );
  for (const chapter of chapters.filter((chapter) => chapter.id !== "ax")) {
    assert.ok(!chapter.models.some((model) => model.id.startsWith("waf-")));
  }
  const wafModels = chapters[3].models.slice(5);
  const wafMaterials = new Set();
  for (const { id, group } of wafModels) {
    assert.deepEqual(group.position.toArray(), [0, 0, 0], id);
    assert.deepEqual(group.rotation.toArray().slice(0, 3), [0, 0, 0], id);
    assert.deepEqual(group.scale.toArray(), [1, 1, 1], id);
    assert.equal(group.userData.front, "+Z");
    assert.equal(group.userData.up, "+Y");
    let draws = 0;
    let shadows = 0;
    group.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      draws++;
      shadows += Number(object.castShadow);
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        wafMaterials.add(material);
        assert.equal(material.map, null, "original geometry has no company UI texture");
      }
      const positions = object.geometry.getAttribute("position");
      const normals = object.geometry.getAttribute("normal");
      assert.ok(positions && normals, object.name);
      for (const value of [...positions.array, ...normals.array]) assert.ok(Number.isFinite(value));
    });
    assert.ok(draws <= 15 && draws + shadows < 20, `${id}: ${draws} meshes + ${shadows} shadows`);
    assert.ok(
      new Box3().setFromObject(group, true).getSize(new Vector3()).z > 0.35,
      `${id} has solid depth`,
    );
  }
  const radar = wafModels[0].group;
  assert.equal(
    radar.getObjectByName("deep-circular-radar-housing").geometry.type,
    "CylinderGeometry",
  );
  assert.equal(radar.getObjectByName("raised-radar-bezel").geometry.type, "TorusGeometry");
  for (const radius of [0.21, 0.43, 0.65]) {
    assert.ok(radar.getObjectByName(`concentric-radar-range-${radius}`));
  }
  assert.ok(radar.getObjectByName("raised-radar-scan-arm").position.z > 0.2);
  assert.equal(wafModels[2].group.getObjectByName("abstract-waf-event-log-rules").count, 6);
  const internalShield = chapters[2].models.find((model) => model.id === "shield").group;
  const wafShield = wafModels[1].group;
  assert.notEqual(
    wafShield.getObjectByName("thick-protective-shield-shell").geometry,
    internalShield.getObjectByName("thick-protective-shield-shell").geometry,
    "the WAF shield is independent geometry, not a shared root",
  );
  const secondSet = createChapterModels();
  for (const chapter of secondSet) {
    for (const { group } of chapter.models) {
      group.traverse((object) => {
        if (!(object instanceof Mesh)) return;
        for (const material of Array.isArray(object.material)
          ? object.material
          : [object.material]) {
          assert.ok(!wafMaterials.has(material), "fresh sets own fresh materials");
        }
      });
    }
  }
  assert.ok(chapters[4].models.some((model) => model.id === "agent"));
  const roots = new Set(chapters.flatMap((chapter) => chapter.models.map((model) => model.group)));
  assert.equal(roots.size, 25, "each chapter owns fresh model roots");
  const geometries = new Set(),
    materials = new Set();
  for (const root of [
    ...roots,
    ...secondSet.flatMap((chapter) => chapter.models.map((model) => model.group)),
  ]) {
    const box = new Box3().setFromObject(root, true),
      size = box.getSize(new Vector3());
    assert.ok(box.getCenter(new Vector3()).length() < 1e-4, root.name);
    assert.ok(Math.abs(Math.max(size.x, size.y, size.z) - 2) < 1e-4, root.name);
    root.traverse((object) => {
      if (object instanceof Mesh) {
        geometries.add(object.geometry);
        for (const m of Array.isArray(object.material) ? object.material : [object.material])
          materials.add(m);
      }
    });
  }
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
});
