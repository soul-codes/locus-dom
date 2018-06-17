import getPosition from "./getPosition";
import { loci } from "./store";

interface ILocusState {
  top: number;
  left: number;
}

/**
 * Synchronizes the position state readout of a DOM element.
 */
export default class Locus {
  private _state: ILocusState = { top: 0, left: 0 };

  constructor(
    readonly settings: {
      /**
       * Specifies the target DOM element.
       */
      target: HTMLElement | (() => HTMLElement);

      /**
       * Specifies the listener function that will be invoked
       * when the layout observers report a change resulting in the
       * observed element changing position.
       */
      listener: (locus: Locus) => any;
    }
  ) {}

  /**
   * Reflects back the configured Locus instance's target DOM element.
   */
  get target(): HTMLElement {
    const { target } = this.settings;
    return typeof target === "function" ? target() : target;
  }

  /**
   * Returns the Locus instance's position state. Has no meaning if
   * the Locus instance is not active.
   */
  get state(): ILocusState {
    return { ...this._state };
  }

  /**
   * Returns true if the Locus instance is currently updating changes.
   */
  get isActive() {
    return loci.has(this);
  }

  /**
   * Start observing positional changes. This always calls the listener
   * once with the freshly calculated current position.
   */
  start() {
    if (!this.isActive) {
      loci.add(this);
      this.update(true);
    }
  }

  /**
   * Stop observing positional changes.
   */
  stop() {
    loci.delete(this);
  }

  /**
   * Force-updates the position state. May result in calling
   * of the listener if the new position differs from the old one.
   */
  update(forceCallListener?: boolean) {
    const {
      target,
      settings: { listener }
    } = this;
    const position = getPosition(target);
    if (
      position.left !== this._state.left ||
      position.top !== this._state.top ||
      forceCallListener
    ) {
      this._state.left = position.left;
      this._state.top = position.top;
      listener(this);
    }
  }
}
