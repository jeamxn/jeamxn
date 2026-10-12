import type { Project } from "@jeamxn/contract";

export const ROTATION_INTERVAL = 5000;
export const ROTATION_BATCH_SIZE = 3;

export function otherProjects(projects: readonly Project[]): Project[] {
  return projects.filter((project) => !project.featured);
}

export function projectBatches(
  projects: readonly Project[],
  size = ROTATION_BATCH_SIZE,
): Project[][] {
  if (!Number.isInteger(size) || size < 1)
    throw new RangeError("Batch size must be a positive integer");
  const batches: Project[][] = [];
  for (let index = 0; index < projects.length; index += size)
    batches.push(projects.slice(index, index + size));
  return batches;
}

export function nextBatch(index: number, direction: number, count: number): number {
  return count > 0 ? (((index + direction) % count) + count) % count : 0;
}
