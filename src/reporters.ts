import registerChangeReporter from "./update";

let shouldLog = false;

export function toggleLogging(log: boolean) {
  shouldLog = log;
}

function log(...args: any[]) {
  console.log("[locus-dom] (built-in change reporters)", ...args);
}

export default function registerBuiltInChangeReporters() {
  registerChangeReporter(report => {
    // mutation observer handles layout changes because of DOM changes
    const globalMutationObserver = new MutationObserver(ev => {
      shouldLog && log("mutation event", ev.map(record => record.target));
      report();
    });
    globalMutationObserver.observe(window.document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
  });

  // resize handles layout changes because of resizing
  registerChangeReporter(report => {
    window.addEventListener("resize", ev => {
      shouldLog && log("resize event", ev.target);
      report();
    });
  });

  // scroll handles layout changes because of scrolling.
  // only elements under the scroll container will change position.
  registerChangeReporter(report => {
    document.addEventListener(
      "scroll",
      ev => {
        shouldLog && log("scroll event", ev.target);
        report();
      },
      true
    );
  });

  // focus-blur handles layout changes because of ":focus" toggle
  // nesting is impossible.
  // downstream siblings and downstream cousins are affected.
  registerChangeReporter(report => {
    document.addEventListener(
      "focus",
      ev => {
        shouldLog && log("focus event", ev.target);
        report();
      },
      true
    );
    document.addEventListener(
      "blur",
      ev => {
        shouldLog && log("blur event", ev.target);
        report();
      },
      true
    );
  });

  // mouseenter-mouseleave handles layout changes because of ":hover" toggle
  // children and downstream siblings
  registerChangeReporter(report => {
    document.addEventListener(
      "mouseenter",
      ev => {
        shouldLog && log("mouse enter event", ev.target);
        report();
      },
      true
    );
    document.addEventListener(
      "mouseleave",
      ev => {
        shouldLog && log("mouse leave event", ev.target);
        report();
      },
      true
    );
  });

  // change handles layout changes because of ":checked" toggle
  // which is not inherently tracked by mutation observer.
  registerChangeReporter(report => {
    document.addEventListener(
      "change",
      ev => {
        shouldLog && log("change event", ev.target);
        report();
      },
      true
    );
  });
}
