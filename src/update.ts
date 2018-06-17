import { loci } from "./store";

let hasSchedule = false;
function scheduleUpdate() {
  if (hasSchedule) return;
  hasSchedule = true;

  requestAnimationFrame(() => {
    hasSchedule = false;
    loci.forEach(locus => locus.update());
  });
}

export default function registerChangeReporter(
  reporter: (update: () => void) => any
) {
  return reporter(scheduleUpdate);
}
