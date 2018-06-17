# locus-dom

**locus-dom** is a Low-level DOM element position observer. It uses mutation observer
and a few global event hooks to detect potential changes to a DOM element's absolute position as a result of the following:

- Programmatic changes in content and styles
- Window resizing
- Window scrolling and scrollbox scrolling
- Hovering on an element
- Focusing on an element
- Checking an element

## Installation

```
npm install locus-dom
```

## Usage

```es6
import { Locus } from "locus-dom";
const locus = new Locus({
  target: document.getElementById("my-target"),
  handler() {
    return locus.state; // e.g. { top : 10, left : 20 }
  }
});

locus.start(); // start observing
locus.stop(); // stop observing
```

When you are no longer interested in the DOM element's position, you
**must** at some point call `stop()` in order for it to be removed from
a registry of active loci. Failing to do so may result in a memory leak.

## Demo

- Clone the repository
- Run `npm install` and then `npm start`.
- The demo is served at port 9001.
