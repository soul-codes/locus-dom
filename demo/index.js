import { Locus, getCurrentLoci, install, toggleLogging } from "../dist";

install();
const target = document.getElementById("target");
const locus = new Locus({
  target: document.getElementById("target"),
  listener() {
    document.getElementById("target-left").textContent = locus.state.left;
    document.getElementById("target-top").textContent = locus.state.top;
  }
});
locus.start();

document
  .getElementById("control-toggle-content")
  .addEventListener("change", ev => {
    const upstreamTextArea = document.getElementById("upstream-textarea");
    ev.target.checked
      ? upstreamTextArea.setAttribute("hidden", "")
      : upstreamTextArea.removeAttribute("hidden");
  });

document
  .getElementById("control-toggle-logging")
  .addEventListener("change", ev => {
    toggleLogging(ev.target.checked);
  });

document
  .getElementById("control-toggle-locus")
  .addEventListener("change", ev => {
    ev.target.checked ? locus.start() : locus.stop();
  });

Object.defineProperty(window, "loci", {
  get: getCurrentLoci
});
