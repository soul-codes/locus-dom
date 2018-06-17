import registerBuiltInChangeReporters from "./reporters";
export { toggleLogging } from "./reporters";
export { default as registerChangeReporter } from "./update";
export { default as Locus } from "./Locus";
export { getCurrentLoci } from "./store";
export { default as getPosition } from "./getPosition";

/**
 * Install the built-in change reporters.
 */
export function install() {
  registerBuiltInChangeReporters();
}
