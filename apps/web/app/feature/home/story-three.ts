import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  activeStory,
  chapterObjectPose,
  chapterWeight,
  STORY_CHAPTERS,
} from "~/shared/lib/scroll-story";
import { createChapterModels } from "./story-chapter-models";

export type StoryScene = {
  paint(progress: number, narrow: boolean): void;
  dispose(): void;
};

/** Scroll fixes the story and base poses; only decorative model offsets use time.
 * Idle rendering is capped and stops when the scene cannot be seen or animated. */
export function createStoryScene(host: HTMLElement): StoryScene {
  const scene = new THREE.Scene();
  // A long lens keeps the 12-unit layout plane exact while letting depth,
  // turns and arrivals read as real perspective instead of a flat projection.
  const CAMERA_DISTANCE = 34;
  const camera = new THREE.PerspectiveCamera(
    THREE.MathUtils.radToDeg(2 * Math.atan(6 / CAMERA_DISTANCE)),
    1,
    1,
    100,
  );
  camera.position.set(0, 0, CAMERA_DISTANCE);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.className = "story-three-canvas";
  host.append(renderer.domElement);
  // Soft studio reflections give the clay-like objects form; the flat ambient
  // wash that made every face the same pale value is gone.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const roomEnvironment = new RoomEnvironment();
  const environment = pmrem.fromScene(roomEnvironment, 0.04).texture;
  roomEnvironment.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      (object.material as THREE.Material).dispose();
    }
  });
  pmrem.dispose();
  scene.environment = environment;
  scene.environmentIntensity = 0.55;
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const hemisphere = new THREE.HemisphereLight(0xfffdf8, 0x9c9789, 1.1);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xfff3e2, 3.4);
  key.position.set(-7, 10, 14);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -14;
  key.shadow.camera.right = 14;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -10;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.03;
  key.shadow.radius = 3;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd9e6ff, 0.9);
  fill.position.set(9, -2, 10);
  scene.add(fill);
  // Cool rim from behind separates light silhouettes from the fog-white page.
  const rim = new THREE.DirectionalLight(0xe4ecff, 2.2);
  rim.position.set(6, 7, -10);
  scene.add(rim);
  const shadows = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 40),
    new THREE.ShadowMaterial({ opacity: 0.11 }),
  );
  shadows.position.z = -1.5;
  shadows.receiveShadow = true;
  scene.add(shadows);
  const chapters = createChapterModels();
  // Pointer parallax tilts this rig, never the models' scroll-derived poses.
  const rig = new THREE.Group();
  scene.add(rig);
  // Each model owns its material copies so it can fade independently while the
  // palette stays shared at creation. Originals are released immediately.
  type Fade = { material: THREE.MeshStandardMaterial; opacity: number; transparent: boolean };
  const fades = new Map<THREE.Group, Fade[]>();
  const originals = new Set<THREE.Material>();
  for (const entry of chapters) {
    for (const { group } of entry.models) {
      const copies = new Map<THREE.Material, THREE.MeshStandardMaterial>();
      const list: Fade[] = [];
      group.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const swap = (material: THREE.Material) => {
          originals.add(material);
          let copy = copies.get(material);
          if (!copy) {
            copy = (material as THREE.MeshStandardMaterial).clone();
            // Satin finish: the environment adds gentle highlights on edges.
            copy.roughness = Math.min(copy.roughness, 0.58);
            copy.envMapIntensity = 0.9;
            copies.set(material, copy);
            list.push({ material: copy, opacity: copy.opacity, transparent: copy.transparent });
          }
          return copy;
        };
        object.material = Array.isArray(object.material)
          ? object.material.map(swap)
          : swap(object.material);
      });
      fades.set(group, list);
    }
  }
  for (const material of originals) material.dispose();
  const shown = new Map<THREE.Group, number>();
  const applyFade = (group: THREE.Group, value: number) => {
    shown.set(group, value);
    for (const fade of fades.get(group) ?? []) {
      const transparent = fade.transparent || value < 0.999;
      if (fade.material.transparent !== transparent) {
        fade.material.transparent = transparent;
        fade.material.needsUpdate = true;
      }
      fade.material.opacity = fade.opacity * value;
    }
  };
  const connections: { line: THREE.Line; chapter: number; target: number }[] = [];
  for (const [chapter, entry] of chapters.entries()) {
    for (const item of entry.models) rig.add(item.group);
    if (chapter < 2) continue;
    for (let target = 0; target < entry.models.length; target++) {
      if (target === (chapter === 2 ? 1 : 0)) continue;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: chapter === 2 ? 0x9bafa5 : 0x93a5bd,
          transparent: true,
          opacity: 0.35,
        }),
      );
      connections.push({ line, chapter, target });
      rig.add(line);
    }
  }
  let width = 1,
    height = 1,
    progress = 0,
    narrow = false,
    destroyed = false,
    renders = 0,
    contextLost = false,
    inView = false,
    hasVisibleModels = false,
    motionSeconds = 0,
    lastFrame = 0,
    pendingFrame = 0,
    tiltX = 0,
    tiltY = 0,
    tiltTargetX = 0,
    tiltTargetY = 0;
  // Display-rate idle motion (capped at 60fps) so the slow float never strobes.
  const frameInterval = 1000 / 60;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  let observer: ResizeObserver | undefined;
  let intersection: IntersectionObserver | undefined;
  const canAnimate = () =>
    !destroyed &&
    !contextLost &&
    !document.hidden &&
    inView &&
    !motionMedia.matches &&
    hasVisibleModels;
  const stopMotion = () => {
    if (pendingFrame) window.cancelAnimationFrame(pendingFrame);
    pendingFrame = 0;
    lastFrame = 0;
    host.dataset.threeMotion = "paused";
  };
  const syncMotion = () => {
    if (!canAnimate()) {
      stopMotion();
      return;
    }
    host.dataset.threeMotion = "running";
    if (!pendingFrame) {
      lastFrame = performance.now();
      pendingFrame = window.requestAnimationFrame(animate);
    }
  };
  function animate(timestamp: number) {
    pendingFrame = 0;
    if (!canAnimate()) {
      stopMotion();
      return;
    }
    const elapsed = timestamp - lastFrame;
    if (elapsed >= frameInterval - 2) {
      // A paused tab never adds its elapsed wall time to the decorative clock.
      const step = Math.min(elapsed, 100) / 1000;
      motionSeconds += step;
      // Critically damped follow (~0.45s) toward the pointer target.
      const follow = 1 - Math.exp(-step / 0.16);
      tiltX += (tiltTargetX - tiltX) * follow;
      tiltY += (tiltTargetY - tiltY) * follow;
      lastFrame = timestamp;
      renderPose();
    }
    if (canAnimate()) pendingFrame = window.requestAnimationFrame(animate);
    else stopMotion();
  }
  const renderPose = () => {
    if (destroyed) return;
    const worldHeight = 12,
      worldWidth = (worldHeight * width) / height;
    const stats = [];
    const animatedStats = [];
    const moving = !contextLost && !document.hidden && inView && !motionMedia.matches;
    const activeIds: string[] = [];
    for (const [chapter, entry] of chapters.entries()) {
      for (const [index, item] of entry.models.entries()) {
        const pose = chapterObjectPose(progress, chapter, index, narrow, item.id);
        const model = item.group;
        model.visible = pose.visible;
        applyFade(model, pose.opacity);
        model.scale.setScalar(Math.max(0.001, pose.scale));
        model.position.set(
          (pose.x / 100 - 0.5) * worldWidth,
          (0.5 - pose.y / 100) * worldHeight,
          pose.z,
        );
        model.rotation.set(pose.rx, pose.ry, pose.rz);
        if (model.visible) activeIds.push(`${entry.id}:${item.id}`);
        const base = {
          chapter: entry.id,
          name: item.id,
          visible: model.visible,
          position: model.position.toArray(),
          rotation: model.rotation.toArray().slice(0, 3),
          scale: pose.scale,
        };
        stats.push(base);
        if (moving && model.visible) {
          // Reapply the scroll-derived base every time: never accumulate drift.
          // Independent 10–16 second cycles stay small enough to leave text alone.
          const phase = chapter * 0.83 + index * 1.37;
          const wave = (period: number, offset = 0) =>
            Math.sin((motionSeconds * Math.PI * 2) / period + phase + offset);
          model.position.y += wave(9) * 0.12;
          model.position.x += wave(13, 2.1) * 0.04;
          model.rotation.x += wave(11, 0.4) * 0.03;
          model.rotation.y += wave(14, 0.8) * 0.09;
          model.rotation.z += wave(8, 1.2) * 0.025;
        }
        animatedStats.push({
          ...base,
          position: model.position.toArray(),
          rotation: model.rotation.toArray().slice(0, 3),
        });
      }
    }
    for (const { line, chapter, target } of connections) {
      const entry = chapters[chapter];
      const satelliteEntry = entry.models[target];
      const wafMain = satelliteEntry.id.startsWith("waf-")
        ? entry.models.find((model) => model.id === "waf-radar")
        : undefined;
      const main = (wafMain ?? entry.models[chapter === 2 ? 1 : 0]).group;
      const satellite = satelliteEntry.group;
      line.visible = main.visible && satellite.visible;
      const values = line.geometry.getAttribute("position") as THREE.BufferAttribute;
      values.setXYZ(0, main.position.x, main.position.y, -0.8);
      values.setXYZ(1, satellite.position.x, satellite.position.y, -0.8);
      values.needsUpdate = true;
      line.geometry.computeBoundingSphere();
      // A thread exists only while both ends are present, so it never dangles.
      (line.material as THREE.LineBasicMaterial).opacity =
        chapterWeight(progress, chapter) *
        Math.min(shown.get(main) ?? 0, shown.get(satellite) ?? 0) *
        0.35;
    }
    rig.rotation.set(moving ? tiltY : 0, moving ? tiltX : 0, 0);
    hasVisibleModels = activeIds.length > 0;
    if (!contextLost && !document.hidden && inView) {
      renderer.render(scene, camera);
      renders++;
      host.dataset.threeReady = "true";
    }
    host.dataset.threeObjects = String(activeIds.length);
    host.dataset.threeChapter = STORY_CHAPTERS[activeStory(progress)];
    host.dataset.threeVisibleIds = JSON.stringify(activeIds);
    host.dataset.threeFrames = String(renders);
    host.dataset.threeDrawCalls = String(renderer.info.render.calls);
    host.dataset.threeTriangles = String(renderer.info.render.triangles);
    // Base transforms retain exact reverse-scroll observability; actual animated
    // transforms are separate so idle motion cannot masquerade as story progress.
    host.dataset.threePose = JSON.stringify(stats);
    host.dataset.threeAnimatedPose = JSON.stringify(animatedStats);
  };
  const paint = (next: number, small: boolean) => {
    if (destroyed) return;
    progress = next;
    narrow = small;
    renderPose();
    syncMotion();
  };
  const resize = () => {
    const box = host.getBoundingClientRect();
    inView =
      box.bottom > 0 &&
      box.top < window.innerHeight &&
      box.right > 0 &&
      box.left < window.innerWidth;
    width = Math.max(1, box.width);
    height = Math.max(1, box.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    paint(progress, width <= 760);
  };
  const lost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    stopMotion();
    host.dataset.threeReady = "false";
  };
  const restored = () => {
    contextLost = false;
    paint(progress, narrow);
  };
  const visibility = () => {
    if (!document.hidden) renderPose();
    syncMotion();
  };
  const preference = () => {
    renderPose();
    syncMotion();
  };
  const pointer = (event: PointerEvent) => {
    if (!finePointer.matches || event.pointerType !== "mouse") return;
    // At most ~4 degrees: a sense of depth under the cursor, never a spin.
    tiltTargetX = ((event.clientX / window.innerWidth) * 2 - 1) * 0.07;
    tiltTargetY = ((event.clientY / window.innerHeight) * 2 - 1) * 0.045;
  };
  const pointerLeave = () => {
    tiltTargetX = 0;
    tiltTargetY = 0;
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  document.addEventListener("visibilitychange", visibility);
  motionMedia.addEventListener("change", preference);
  window.addEventListener("pointermove", pointer, { passive: true });
  document.documentElement.addEventListener("pointerleave", pointerLeave);
  intersection = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0);
    if (inView) renderPose();
    syncMotion();
  });
  intersection.observe(host);
  observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  return {
    paint,
    dispose() {
      if (destroyed) return;
      destroyed = true;
      stopMotion();
      observer?.disconnect();
      intersection?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      motionMedia.removeEventListener("change", preference);
      window.removeEventListener("pointermove", pointer);
      document.documentElement.removeEventListener("pointerleave", pointerLeave);
      environment.dispose();
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          if (object instanceof THREE.InstancedMesh) object.dispose();
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            materials.add(material);
        }
      });
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
      host.dataset.threeReady = "false";
    },
  };
}
