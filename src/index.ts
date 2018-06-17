import registerBuiltInChangeReporters from "./reporters";
export { toggleLogging } from "./reporters";
export { default as registerChangeReporter } from "./update";
export { default as Locus } from "./Locus";
export { getCurrentLoci } from "./store";

export function install() {
  registerBuiltInChangeReporters();
}
