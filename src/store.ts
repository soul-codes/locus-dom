import Locus from "./Locus";

export const loci = new Set<Locus>();
export function getCurrentLoci() {
  return [...loci];
}
