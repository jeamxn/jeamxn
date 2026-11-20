import type { ComponentType } from "react";

/* The vendored React Bits components share no prop shape, so a loaded module is
   typed loosely here and each call site passes the props that component reads. */
// biome-ignore lint/suspicious/noExplicitAny: 219 unrelated vendor prop interfaces
export type BitComponent = ComponentType<any>;
export type BitModule = { default: BitComponent } & Record<string, BitComponent>;

/* One chunk per component: a page only downloads the ones it actually shows. */
const modules = import.meta.glob("../reactbits/*.tsx") as Record<string, () => Promise<BitModule>>;
const loaded = new Map<string, Promise<BitModule>>();

export const bitNames = Object.keys(modules)
  .map((file) => file.slice(file.lastIndexOf("/") + 1, -".tsx".length))
  .sort((a, b) => a.localeCompare(b));

export function loadBit(name: string): Promise<BitModule> {
  let job = loaded.get(name);
  if (!job) {
    const load = modules[`../reactbits/${name}.tsx`];
    job = load ? load() : Promise.reject(new Error(`unknown component ${name}`));
    loaded.set(name, job);
    job.catch(() => loaded.delete(name));
  }
  return job;
}
