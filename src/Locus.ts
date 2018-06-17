import getPosition from "./getPosition";
import { loci } from "./store";

interface ILocusState {
  top: number;
  left: number;
}

export default class Locus {
  private _state: ILocusState = { top: 0, left: 0 };

  constructor(
    readonly settings: {
      target: HTMLElement | (() => HTMLElement);
      listener: (locus: Locus) => void;
    }
  ) {}

  get target(): HTMLElement {
    const { target } = this.settings;
    return typeof target === "function" ? target() : target;
  }

  get state(): ILocusState {
    return { ...this._state };
  }

  get isActive() {
    return loci.has(this);
  }

  start() {
    if (!this.isActive) {
      loci.add(this);
      this.update();
    }
  }

  stop() {
    loci.delete(this);
  }

  update() {
    const {
      target,
      settings: { listener }
    } = this;
    const position = getPosition(target);
    if (
      position.left !== this._state.left ||
      position.top !== this._state.top
    ) {
      this._state.left = position.left;
      this._state.top = position.top;
      listener(this);
    }
  }
}
