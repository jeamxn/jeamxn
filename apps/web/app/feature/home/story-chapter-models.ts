import {
  Box3,
  type BufferGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  ExtrudeGeometry,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { StoryChapterId } from "../../shared/lib/scroll-story";
import { createStoryModel } from "./story-three-models";

// Original, deliberately solid miniature objects, not screenshots or image planes.
// Each chapter has a different principal silhouette and color family.
const COLORS = {
  porcelain: "#edece7",
  paper: "#faf9f2",
  edge: "#c9c7bf",
  ink: "#39424b",
  blue: "#809bb9",
  blueDark: "#4e6986",
  sage: "#95ada2",
  sageDark: "#5f8276",
  lavender: "#b4a9c8",
  lavenderDark: "#79768e",
  gold: "#bca574",
};
type Materials = Record<keyof typeof COLORS, MeshStandardMaterial>;
type Point = readonly [number, number, number];
type ModelEntry = { id: string; group: Group };

function makeMaterials(): Materials {
  return Object.fromEntries(
    Object.entries(COLORS).map(([name, color]) => [
      name,
      new MeshStandardMaterial({
        name: `chapter-${name}`,
        color,
        roughness: name === "gold" ? 0.48 : 0.72,
        metalness: name === "gold" ? 0.2 : 0.025,
      }),
    ]),
  ) as Materials;
}

function mesh(
  group: Group,
  name: string,
  geometry: BufferGeometry,
  material: MeshStandardMaterial,
  position: Point = [0, 0, 0],
): Mesh {
  const object = new Mesh(geometry, material);
  object.name = name;
  object.position.set(...position);
  object.castShadow = true;
  object.receiveShadow = true;
  group.add(object);
  return object;
}

function box(
  group: Group,
  name: string,
  size: Point,
  material: MeshStandardMaterial,
  position: Point = [0, 0, 0],
  radius = 0.06,
): Mesh {
  return mesh(
    group,
    name,
    new RoundedBoxGeometry(...size, 3, Math.min(radius, ...size.map((value) => value / 3))),
    material,
    position,
  );
}

function cylinder(
  group: Group,
  name: string,
  radius: number,
  height: number,
  material: MeshStandardMaterial,
  position: Point,
): Mesh {
  return mesh(group, name, new CylinderGeometry(radius, radius, height, 40), material, position);
}

function sphere(
  group: Group,
  name: string,
  radius: number,
  material: MeshStandardMaterial,
  position: Point,
): Mesh {
  return mesh(group, name, new SphereGeometry(radius, 28, 18), material, position);
}

function ring(
  group: Group,
  name: string,
  radius: number,
  thickness: number,
  material: MeshStandardMaterial,
  position: Point,
): Mesh {
  return mesh(group, name, new TorusGeometry(radius, thickness, 12, 44), material, position);
}

function wire(
  group: Group,
  name: string,
  points: readonly Point[],
  thickness: number,
  material: MeshStandardMaterial,
): Mesh {
  return mesh(
    group,
    name,
    new TubeGeometry(
      new CatmullRomCurve3(points.map((point) => new Vector3(...point))),
      48,
      thickness,
      12,
    ),
    material,
  );
}

function repeatedBoxes(
  group: Group,
  name: string,
  size: Point,
  material: MeshStandardMaterial,
  points: readonly Point[],
): InstancedMesh {
  const geometry = new RoundedBoxGeometry(...size, 2, Math.min(0.025, ...size.map((n) => n / 3)));
  const object = new InstancedMesh(geometry, material, points.length);
  object.name = name;
  object.castShadow = true;
  object.receiveShadow = true;
  const matrix = new Matrix4();
  points.forEach((point, index) => {
    object.setMatrixAt(index, matrix.makeTranslation(...point));
  });
  object.instanceMatrix.needsUpdate = true;
  group.add(object);
  return object;
}

function extrusion(shape: Shape, depth: number, bevel = 0.025): ExtrudeGeometry {
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: bevel,
    bevelThickness: bevel,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

function normalize(id: string, content: Group): Group {
  const root = new Group();
  root.name = id;
  root.userData = {
    kind: id,
    modeling: "manually-created-procedural-geometry",
    front: "+Z",
    up: "+Y",
  };
  content.name = `${id}-normalized-content`;
  root.add(content);
  root.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(root, true);
  const center = bounds.getCenter(new Vector3());
  const size = bounds.getSize(new Vector3());
  const scale = 2 / Math.max(size.x, size.y, size.z);
  content.scale.multiplyScalar(scale);
  content.position.copy(center).multiplyScalar(-scale);
  root.updateMatrixWorld(true);
  return root;
}

function legacy(id: string, name: Parameters<typeof createStoryModel>[0]): ModelEntry {
  const group = createStoryModel(name);
  group.name = id;
  group.userData.kind = id;
  return { id, group };
}

/** A school hub: two classroom floors, deep pitched roof, clock tower and entrance. */
function campus(m: Materials): Group {
  const g = new Group();
  box(g, "school-foundation-plinth", [2.5, 0.14, 1.14], m.edge, [0, -0.85, 0]);
  box(g, "two-storey-school-building", [2.25, 1.35, 0.76], m.porcelain, [0, -0.1, -0.05]);
  box(g, "classroom-floor-cornice", [2.32, 0.075, 0.83], m.sage, [0, -0.11, -0.02]);
  const roof = new Shape();
  roof.moveTo(-1.23, 0.52);
  roof.lineTo(0, 1.02);
  roof.lineTo(1.23, 0.52);
  roof.closePath();
  mesh(g, "solid-pitched-school-roof", extrusion(roof, 0.95), m.sageDark, [0, 0, -0.05]);
  box(g, "central-clock-tower", [0.57, 1.48, 0.86], m.paper, [0, 0.18, 0.07]);
  box(g, "clock-tower-cap", [0.71, 0.14, 0.98], m.sage, [0, 0.95, 0.07]);
  const windows: Point[] = [];
  for (const x of [-0.88, -0.52, 0.52, 0.88]) {
    for (const y of [-0.43, 0.2]) windows.push([x, y, 0.35]);
  }
  repeatedBoxes(g, "eight-recessed-classroom-windows", [0.25, 0.34, 0.045], m.blueDark, windows);
  repeatedBoxes(
    g,
    "eight-classroom-window-sills",
    [0.3, 0.045, 0.12],
    m.edge,
    windows.map(([x, y, z]) => [x, y - 0.19, z + 0.02]),
  );
  repeatedBoxes(
    g,
    "classroom-window-mullions",
    [0.024, 0.34, 0.035],
    m.paper,
    windows.map(([x, y, z]) => [x, y, z + 0.035]),
  );
  cylinder(g, "raised-school-clock-face", 0.2, 0.055, m.paper, [0, 0.59, 0.535]).rotation.x =
    Math.PI / 2;
  ring(g, "school-clock-bezel", 0.2, 0.022, m.gold, [0, 0.59, 0.574]);
  box(g, "clock-hour-hand", [0.025, 0.11, 0.025], m.ink, [0, 0.635, 0.581], 0.007);
  const minute = box(
    g,
    "clock-minute-hand",
    [0.13, 0.02, 0.026],
    m.ink,
    [0.052, 0.59, 0.581],
    0.006,
  );
  minute.rotation.z = -0.25;
  box(g, "double-entry-door-recess", [0.38, 0.62, 0.07], m.blueDark, [0, -0.46, 0.54]);
  box(g, "double-door-center-bar", [0.02, 0.59, 0.045], m.gold, [0, -0.46, 0.59], 0.005);
  box(g, "entrance-canopy", [0.78, 0.09, 0.45], m.sage, [0, -0.1, 0.59]);
  repeatedBoxes(g, "entrance-canopy-pillars", [0.055, 0.62, 0.055], m.paper, [
    [-0.32, -0.45, 0.75],
    [0.32, -0.45, 0.75],
  ]);
  box(g, "broad-front-school-step", [0.95, 0.1, 0.51], m.porcelain, [0, -0.77, 0.57]);
  return g;
}

/** Related consoles stay recognizable, but each has a different operation surface. */
function adminConsole(m: Materials, variant: "left" | "center" | "right"): Group {
  const g = new Group();
  const accent = variant === "left" ? m.sage : variant === "right" ? m.lavender : m.blueDark;
  box(g, "console-weighted-foot", [1.18, 0.12, 0.72], accent, [0, -0.88, 0.02]);
  box(g, "console-support-stem", [0.22, 0.46, 0.22], m.edge, [0, -0.64, -0.05]);
  box(g, "deep-admin-console-shell", [1.95, 1.39, 0.25], m.porcelain, [0, 0.16, 0]);
  box(g, "admin-console-matte-screen", [1.73, 1.17, 0.055], m.paper, [0, 0.16, 0.15]);
  box(g, "admin-window-color-toolbar", [1.73, 0.19, 0.05], accent, [0, 0.65, 0.189]);
  repeatedBoxes(g, "window-control-studs", [0.045, 0.045, 0.025], m.paper, [
    [-0.72, 0.65, 0.23],
    [-0.62, 0.65, 0.23],
    [-0.52, 0.65, 0.23],
  ]);
  box(g, "persistent-admin-sidebar", [0.34, 0.91, 0.055], accent, [-0.685, 0.04, 0.2]);
  repeatedBoxes(g, "sidebar-menu-rows", [0.2, 0.035, 0.025], m.paper, [
    [-0.685, 0.29, 0.24],
    [-0.685, 0.11, 0.24],
    [-0.685, -0.07, 0.24],
  ]);
  if (variant === "center") {
    box(g, "central-integrated-workspace-header", [1.05, 0.14, 0.045], m.blue, [0.19, 0.34, 0.22]);
    for (const x of [-0.12, 0.44]) {
      box(g, `unified-admin-module-${x}`, [0.47, 0.48, 0.07], m.porcelain, [x, -0.07, 0.23]);
      box(g, `module-state-${x}`, [0.3, 0.065, 0.03], m.sage, [x, 0.05, 0.28]);
      box(g, `module-label-${x}`, [0.3, 0.035, 0.03], m.edge, [x, -0.11, 0.28]);
    }
  } else if (variant === "left") {
    for (let i = 0; i < 3; i++) {
      box(g, `legacy-admin-table-row-${i}`, [1.05, 0.15, 0.04], i === 1 ? m.sage : m.edge, [
        0.19,
        0.31 - i * 0.25,
        0.22,
      ]);
      box(g, `table-row-state-${i}`, [0.13, 0.055, 0.025], m.paper, [0.59, 0.31 - i * 0.25, 0.26]);
    }
  } else {
    box(g, "separate-admin-profile-panel", [0.87, 0.57, 0.055], m.porcelain, [0.19, 0.06, 0.22]);
    sphere(g, "profile-avatar-solid", 0.12, m.lavender, [-0.02, 0.14, 0.28]).scale.z = 0.3;
    box(g, "profile-name-line", [0.33, 0.05, 0.025], m.edge, [0.35, 0.16, 0.27]);
    box(g, "profile-detail-line", [0.56, 0.04, 0.025], m.edge, [0.19, -0.1, 0.27]);
    box(g, "separate-admin-action", [0.43, 0.11, 0.04], m.lavenderDark, [0.41, -0.31, 0.23]);
  }
  return g;
}

function shield(m: Materials): Group {
  const g = new Group();
  const outline = new Shape();
  outline.moveTo(-0.76, 0.79);
  outline.quadraticCurveTo(0, 0.6, 0.76, 0.79);
  outline.lineTo(0.72, -0.01);
  outline.quadraticCurveTo(0.62, -0.65, 0, -1.01);
  outline.quadraticCurveTo(-0.62, -0.65, -0.72, -0.01);
  outline.closePath();
  mesh(g, "thick-protective-shield-shell", extrusion(outline, 0.29, 0.055), m.blueDark);
  const inset = mesh(
    g,
    "shield-inset-face",
    extrusion(outline, 0.055, 0.035),
    m.blue,
    [0, 0, 0.18],
  );
  inset.scale.set(0.83, 0.83, 1);
  box(g, "gold-lock-body", [0.65, 0.55, 0.22], m.gold, [0, -0.19, 0.34], 0.09);
  wire(
    g,
    "solid-U-shaped-lock-shackle",
    [
      [-0.23, 0.02, 0.34],
      [-0.23, 0.32, 0.34],
      [0, 0.48, 0.34],
      [0.23, 0.32, 0.34],
      [0.23, 0.02, 0.34],
    ],
    0.058,
    m.paper,
  );
  sphere(g, "lock-keyhole-round", 0.063, m.blueDark, [0, -0.14, 0.462]).scale.z = 0.32;
  box(g, "lock-keyhole-stem", [0.055, 0.12, 0.024], m.blueDark, [0, -0.22, 0.462], 0.015);
  return g;
}

function key(m: Materials): Group {
  const g = new Group();
  ring(g, "key-circular-bow", 0.34, 0.105, m.gold, [-0.54, 0.2, 0]);
  box(g, "key-solid-shaft", [1.28, 0.16, 0.18], m.gold, [0.4, 0.2, 0]);
  box(g, "key-first-cut-tooth", [0.17, 0.35, 0.18], m.gold, [0.91, 0.03, 0]);
  box(g, "key-second-cut-tooth", [0.16, 0.27, 0.18], m.gold, [0.59, 0.06, 0]);
  box(g, "key-bow-collar", [0.22, 0.26, 0.33], m.edge, [-0.11, 0.2, 0]);
  return g;
}

function lilyAssistant(m: Materials): Group {
  const g = new Group();
  cylinder(g, "assistant-round-desktop-dock", 0.72, 0.19, m.porcelain, [0, -0.73, 0]);
  ring(g, "dock-lavender-rim", 0.64, 0.035, m.lavenderDark, [0, -0.62, 0]).rotation.x = Math.PI / 2;
  cylinder(g, "assistant-short-neck", 0.16, 0.26, m.edge, [0, -0.51, 0]);
  sphere(g, "round-lily-assistant-core", 0.71, m.lavender, [0, 0.19, 0]);
  box(g, "inset-assistant-face-mask", [1.1, 0.63, 0.17], m.lavenderDark, [0, 0.22, 0.58], 0.18);
  for (const x of [-0.25, 0.25]) {
    const eye = sphere(g, `assistant-eye-${x}`, 0.085, m.paper, [x, 0.29, 0.683]);
    eye.scale.set(0.65, 1, 0.38);
  }
  wire(
    g,
    "quiet-curved-assistant-smile",
    [
      [-0.15, 0.08, 0.685],
      [0, 0.035, 0.7],
      [0.15, 0.08, 0.685],
    ],
    0.025,
    m.paper,
  );
  wire(
    g,
    "assistant-top-signal-stem",
    [
      [0, 0.8, 0],
      [0.02, 1.0, 0],
      [0.19, 1.05, 0],
    ],
    0.035,
    m.gold,
  );
  sphere(g, "assistant-signal-tip", 0.085, m.gold, [0.19, 1.05, 0]);
  sphere(g, "left-assistant-dock-button", 0.06, m.sage, [-0.33, -0.7, 0.63]);
  sphere(g, "right-assistant-dock-button", 0.06, m.blue, [0.33, -0.7, 0.63]);
  return g;
}

function mcpServer(m: Materials): Group {
  const g = new Group();
  box(g, "server-rack-solid-enclosure", [1.29, 1.89, 0.92], m.porcelain, [0, 0, 0], 0.12);
  box(g, "server-rack-recess", [1.06, 1.6, 0.06], m.lavenderDark, [0, 0, 0.48]);
  for (let i = 0; i < 3; i++) {
    const y = 0.52 - i * 0.5;
    box(g, `server-removable-tray-${i}`, [0.94, 0.38, 0.12], m.edge, [0, y, 0.53]);
    repeatedBoxes(g, `server-tray-vent-slots-${i}`, [0.045, 0.16, 0.025], m.ink, [
      [-0.31, y, 0.606],
      [-0.21, y, 0.606],
      [-0.11, y, 0.606],
    ]);
    sphere(g, `server-tray-status-light-${i}`, 0.043, i === 1 ? m.blue : m.sage, [0.32, y, 0.62]);
  }
  box(g, "server-connector-socket-rim", [0.31, 0.29, 0.15], m.lavender, [0.73, -0.41, 0.2]);
  box(g, "server-connector-deep-socket", [0.19, 0.17, 0.025], m.ink, [0.73, -0.41, 0.29]);
  repeatedBoxes(g, "server-connector-pin-contacts", [0.035, 0.075, 0.025], m.gold, [
    [0.68, -0.41, 0.31],
    [0.78, -0.41, 0.31],
  ]);
  repeatedBoxes(g, "server-rack-feet", [0.21, 0.12, 0.32], m.lavenderDark, [
    [-0.41, -0.98, 0],
    [0.41, -0.98, 0],
  ]);
  return g;
}

function toolPlug(m: Materials): Group {
  const g = new Group();
  box(g, "rounded-tool-connector-grip", [0.8, 0.8, 0.54], m.lavender, [0.29, 0.29, 0], 0.16);
  box(g, "connector-solid-metal-nose", [0.62, 0.47, 0.47], m.edge, [0.29, 0.88, 0]);
  box(g, "connector-recessed-nose", [0.43, 0.2, 0.035], m.ink, [0.29, 0.94, 0.255], 0.025);
  repeatedBoxes(g, "connector-contact-pins", [0.065, 0.2, 0.025], m.gold, [
    [0.16, 0.94, 0.28],
    [0.29, 0.94, 0.28],
    [0.42, 0.94, 0.28],
  ]);
  box(g, "grip-front-inset", [0.48, 0.14, 0.045], m.paper, [0.29, 0.29, 0.286], 0.04);
  cylinder(g, "connector-strain-relief", 0.18, 0.27, m.lavenderDark, [0.29, -0.21, 0]);
  wire(
    g,
    "thick-curved-connecting-cable",
    [
      [0.29, -0.24, 0],
      [0.24, -0.64, 0],
      [-0.23, -0.87, 0.12],
      [-0.64, -0.61, 0.22],
      [-0.62, -0.24, 0.2],
    ],
    0.07,
    m.blueDark,
  );
  box(g, "cable-terminal-block", [0.3, 0.33, 0.29], m.porcelain, [-0.62, -0.13, 0.2]);
  box(g, "cable-terminal-contact", [0.22, 0.16, 0.21], m.gold, [-0.62, 0.11, 0.2]);
  return g;
}

/** Generic presentation apparatus: no fabricated internal slide or screenshot. */
function presentation(m: Materials): Group {
  const g = new Group();
  box(g, "presentation-board-deep-frame", [1.95, 1.26, 0.16], m.edge, [0, 0.47, 0]);
  box(g, "presentation-board-ivory-surface", [1.76, 1.08, 0.045], m.paper, [0, 0.47, 0.105]);
  box(g, "generic-AX-slide-title-rule", [1.23, 0.075, 0.04], m.lavenderDark, [-0.06, 0.82, 0.145]);
  for (let i = 0; i < 3; i++) {
    const height = [0.23, 0.39, 0.54][i];
    box(
      g,
      `generic-slide-explanation-column-${i}`,
      [0.22, height, 0.065],
      [m.sage, m.blue, m.lavender][i],
      [-0.54 + i * 0.45, 0.04 + height / 2, 0.16],
    );
  }
  box(g, "slide-bottom-rule", [1.42, 0.025, 0.03], m.edge, [0, 0.03, 0.16], 0.006);
  repeatedBoxes(g, "presentation-board-stand-legs", [0.075, 0.75, 0.1], m.lavenderDark, [
    [-0.61, -0.52, -0.03],
    [0.61, -0.52, -0.03],
  ]);
  box(g, "presentation-stand-wide-foot", [1.64, 0.09, 0.67], m.edge, [0, -0.93, -0.03]);
  box(g, "speaker-podium-body", [0.64, 0.64, 0.44], m.lavender, [0.57, -0.57, 0.55]);
  const top = box(g, "podium-sloped-top", [0.79, 0.09, 0.57], m.lavenderDark, [0.57, -0.2, 0.55]);
  top.rotation.x = 0.14;
  wire(
    g,
    "podium-gooseneck-microphone",
    [
      [0.72, -0.13, 0.43],
      [0.73, 0.04, 0.43],
      [0.61, 0.11, 0.5],
    ],
    0.022,
    m.ink,
  );
  sphere(g, "podium-microphone-head", 0.055, m.ink, [0.61, 0.11, 0.5]);
  return g;
}

/** Original radar apparatus, not a reproduction of any monitoring interface. */
function wafRadar(m: Materials): Group {
  const g = new Group();
  box(g, "radar-weighted-desktop-foot", [1.2, 0.14, 0.86], m.edge, [0, -1, 0]);
  box(g, "radar-short-support-stem", [0.24, 0.43, 0.28], m.lavenderDark, [0, -0.75, -0.02]);
  cylinder(g, "deep-circular-radar-housing", 0.85, 0.26, m.porcelain, [0, 0.18, 0]).rotation.x =
    Math.PI / 2;
  cylinder(g, "recessed-radar-dial", 0.76, 0.045, m.blueDark, [0, 0.18, 0.153]).rotation.x =
    Math.PI / 2;
  ring(g, "raised-radar-bezel", 0.8, 0.034, m.lavender, [0, 0.18, 0.168]);
  for (const radius of [0.21, 0.43, 0.65]) {
    ring(g, `concentric-radar-range-${radius}`, radius, 0.012, m.blue, [0, 0.18, 0.19]);
  }
  const arm = box(
    g,
    "raised-radar-scan-arm",
    [0.046, 0.7, 0.055],
    m.gold,
    [0.2, 0.446, 0.233],
    0.012,
  );
  arm.rotation.z = -0.645;
  sphere(g, "solid-radar-scan-hub", 0.065, m.paper, [0, 0.18, 0.237]);
  for (const [index, point] of (
    [
      [-0.36, 0.44, 0.216],
      [0.34, -0.16, 0.216],
      [0.17, 0.76, 0.216],
    ] as const
  ).entries()) {
    sphere(g, `raised-radar-event-dot-${index}`, 0.043, m.sage, point);
  }
  return g;
}

/** Three solid event cards with abstract indicators, no real log contents. */
function wafEvents(m: Materials): Group {
  const g = new Group();
  const rules: Point[] = [];
  for (let i = 0; i < 3; i++) {
    const x = -0.1 + i * 0.1;
    const y = 0.61 - i * 0.61;
    const z = -0.1 + i * 0.1;
    box(g, `solid-waf-event-card-${i}`, [1.48, 0.49, 0.2], m.paper, [x, y, z], 0.07);
    sphere(g, `waf-event-status-indicator-${i}`, 0.069, i === 1 ? m.gold : m.sage, [
      x - 0.49,
      y,
      z + 0.12,
    ]);
    rules.push([x + 0.13, y + 0.075, z + 0.115], [x + 0.13, y - 0.075, z + 0.115]);
  }
  repeatedBoxes(g, "abstract-waf-event-log-rules", [0.7, 0.038, 0.03], m.blue, rules);
  return g;
}

/** An integrated agent dock with actual connector ports and a raised wave mark. */
function agentHub(m: Materials): Group {
  const g = new Group();
  cylinder(g, "integrated-agent-weighted-dock", 0.83, 0.23, m.blueDark, [0, -0.73, 0]);
  ring(g, "agent-dock-orbit-rail", 0.8, 0.035, m.blue, [0, -0.59, 0]).rotation.x = Math.PI / 2;
  box(g, "rounded-integrated-agent-hub", [1.49, 1.28, 0.82], m.porcelain, [0, 0.04, 0], 0.22);
  box(g, "blue-agent-inset-front", [1.23, 0.98, 0.095], m.blueDark, [0, 0.04, 0.455], 0.18);
  for (let i = 0; i < 3; i++) {
    const y = -0.22 + i * 0.24;
    wire(
      g,
      `raised-parallel-wave-mark-${i}`,
      [
        [-0.43, y, 0.53],
        [-0.22, y + 0.1, 0.53],
        [0, y, 0.53],
        [0.22, y - 0.1, 0.53],
        [0.43, y, 0.53],
      ],
      0.037,
      m.paper,
    );
  }
  for (const x of [-0.8, 0.8]) {
    box(g, `side-connector-port-${x}`, [0.2, 0.28, 0.38], m.blue, [x, -0.14, 0]);
    box(g, `side-connector-pin-${x}`, [0.08, 0.13, 0.22], m.gold, [x * 1.1, -0.14, 0]);
  }
  box(g, "agent-top-connector-port", [0.28, 0.19, 0.33], m.blue, [0, 0.73, 0]);
  box(g, "agent-top-connector-contact", [0.15, 0.07, 0.2], m.gold, [0, 0.86, 0]);
  repeatedBoxes(g, "three-dock-front-status-lights", [0.09, 0.045, 0.035], m.paper, [
    [-0.2, -0.73, 0.815],
    [0, -0.73, 0.84],
    [0.2, -0.73, 0.815],
  ]);
  return g;
}

function workspaceCanvas(m: Materials): Group {
  const g = new Group();
  box(g, "deep-workspace-panel-shell", [2.04, 1.55, 0.29], m.blueDark, [0, 0, 0], 0.14);
  box(g, "recessed-canvas-workspace", [1.83, 1.34, 0.065], m.paper, [0, 0, 0.17]);
  box(g, "workspace-toolbar", [1.83, 0.2, 0.055], m.blue, [0, 0.56, 0.215]);
  repeatedBoxes(g, "workspace-toolbar-tool-controls", [0.09, 0.08, 0.035], m.paper, [
    [-0.72, 0.56, 0.26],
    [-0.52, 0.56, 0.26],
    [-0.32, 0.56, 0.26],
  ]);
  box(g, "canvas-document-tile", [0.66, 0.74, 0.11], m.porcelain, [-0.42, -0.03, 0.26]);
  box(g, "canvas-document-title", [0.42, 0.065, 0.045], m.blue, [-0.42, 0.18, 0.34]);
  repeatedBoxes(g, "canvas-document-body-lines", [0.42, 0.035, 0.035], m.edge, [
    [-0.42, 0, 0.34],
    [-0.42, -0.13, 0.34],
  ]);
  box(g, "canvas-connected-note", [0.57, 0.39, 0.09], m.sage, [0.42, 0.14, 0.26]);
  box(g, "canvas-connected-note-line", [0.33, 0.04, 0.035], m.paper, [0.42, 0.14, 0.32]);
  box(g, "canvas-connected-media-tile", [0.57, 0.39, 0.09], m.lavender, [0.42, -0.36, 0.26]);
  wire(
    g,
    "canvas-raised-connection-wire",
    [
      [-0.08, -0.16, 0.34],
      [0.1, -0.16, 0.36],
      [0.12, 0.14, 0.36],
      [0.13, 0.14, 0.34],
    ],
    0.018,
    m.gold,
  );
  box(g, "workspace-rear-kickstand", [0.8, 0.12, 0.62], m.edge, [0, -0.78, -0.18]);
  return g;
}

// Tiny text, keys and vents still receive shadows, but only solid silhouettes
// cast them. Otherwise two chapter groups double every detail draw in the shadow
// pass despite those sub-pixel shadows adding no visible information.
const SHADOW_SILHOUETTES = new Set([
  "continuous-frosted-glass-envelope",
  "metal-screw-base",
  "tabbed-folder-back",
  "open-folder-front-flap",
  "school-foundation-plinth",
  "two-storey-school-building",
  "solid-pitched-school-roof",
  "central-clock-tower",
  "rounded-turntable-plinth",
  "raised-platter",
  "vinyl-record",
  "rounded-washer-cabinet",
  "deep-drum-recess",
  "convex-smoky-blue-window",
  "calendar-desk-foot",
  "sloping-rear-stand",
  "thick-page-pad",
  "console-weighted-foot",
  "console-support-stem",
  "deep-admin-console-shell",
  "thick-protective-shield-shell",
  "gold-lock-body",
  "key-circular-bow",
  "key-solid-shaft",
  "key-first-cut-tooth",
  "key-second-cut-tooth",
  "laptop-rounded-base",
  "thick-display-shell",
  "assistant-round-desktop-dock",
  "round-lily-assistant-core",
  "inset-assistant-face-mask",
  "server-rack-solid-enclosure",
  "server-removable-tray-0",
  "server-removable-tray-1",
  "server-removable-tray-2",
  "rounded-tool-connector-grip",
  "connector-solid-metal-nose",
  "cable-terminal-block",
  "sage-reply-solid-bubble",
  "lavender-message-solid-bubble",
  "presentation-board-deep-frame",
  "speaker-podium-body",
  "radar-weighted-desktop-foot",
  "radar-short-support-stem",
  "deep-circular-radar-housing",
  "solid-waf-event-card-0",
  "solid-waf-event-card-1",
  "solid-waf-event-card-2",
  "integrated-agent-weighted-dock",
  "rounded-integrated-agent-hub",
  "deep-workspace-panel-shell",
]);

/** Fresh scene sets; identity roots, +Z front, +Y up, max AABB size 2. */
export function createChapterModels(): { id: StoryChapterId; models: ModelEntry[] }[] {
  const m = makeMaterials();
  const original = (id: string, content: Group): ModelEntry => ({
    id,
    group: normalize(id, content),
  });
  const chapters: { id: StoryChapterId; models: ModelEntry[] }[] = [
    { id: "intro", models: [legacy("idea", "idea"), legacy("document", "document")] },
    {
      id: "dipull",
      models: [
        original("campus", campus(m)),
        legacy("music", "music"),
        legacy("laundry", "laundry"),
        legacy("calendar", "calendar"),
      ],
    },
    {
      id: "internal",
      models: [
        original("admin-left", adminConsole(m, "left")),
        original("admin-center", adminConsole(m, "center")),
        original("admin-right", adminConsole(m, "right")),
        original("shield", shield(m)),
        original("key", key(m)),
        legacy("dpd", "chart"),
      ],
    },
    {
      id: "ax",
      models: [
        original("lily", lilyAssistant(m)),
        original("mcp-server", mcpServer(m)),
        original("tool-plug", toolPlug(m)),
        legacy("meeting", "chat"),
        original("presentation", presentation(m)),
        original("waf-radar", wafRadar(m)),
        original("waf-shield", shield(m)),
        original("waf-events", wafEvents(m)),
      ],
    },
    {
      id: "ara",
      models: [
        original("agent", agentHub(m)),
        legacy("document", "document"),
        legacy("calendar", "calendar"),
        original("tool-plug", toolPlug(m)),
        original("canvas", workspaceCanvas(m)),
      ],
    },
  ];
  // No unreferenced palette materials are left for the caller to guess about.
  const used = new Set<MeshStandardMaterial>();
  for (const chapter of chapters) {
    for (const { group } of chapter.models) {
      group.userData.chapter = chapter.id;
      group.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow =
            SHADOW_SILHOUETTES.has(object.name) &&
            !(Array.isArray(object.material)
              ? object.material.some((material) => material.transparent)
              : object.material.transparent);
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            used.add(material);
        }
      });
    }
  }
  for (const material of Object.values(m)) if (!used.has(material)) material.dispose();
  return chapters;
}
