/**
 * Surface - canvas element whose size is determined
 * by aspect ratio.
 */
class Surface {
  #el;

  /**
   * @param {string} selector
   * @param {number} viewWport
   * @param {number} viewHport
   * @param {string} [units] Possible values: "vmin", "vmax".
   */
  constructor(selector, viewWport, viewHport, units = "vmin") {
    this.selector = selector;
    this.viewWport = viewWport;
    this.viewHport = viewHport;
    this.units = units;
    this.#init();
  }

  /**
   * @returns Surface element.
   */
  get el() {
    return this.#el;
  }

  /**
   * @returns Surface context.
   */
  get ctx() {
    return this.el.getContext("2d");
  }

  /**
   * @returns Surface width.
   */
  get w() {
    return this.el.width;
  }

  /**
   * @returns Surface height.
   */
  get h() {
    return this.el.height;
  }

  /**
   * @param {number} w
   */
  set w(w) {
    this.#el.width = w;
  }

  /**
   * @param {number} h
   */
  set h(h) {
    this.#el.height = h;
  }

  #init() {
    this.#el = document.querySelector(this.selector);
    this.resize();
  }

  resize() {
    const wW = window.innerWidth;
    const wH = window.innerHeight;

    /** Surface aspect. */
    const sAsp = (this.viewHport / this.viewWport) * 100;

    /** Window aspect. */
    const wAsp = (wH / wW) * 100;

    /** Is window aspect less than surface aspect? */
    const wLtS = wAsp < sAsp;

    this.w = wLtS ? (wH * 100) / sAsp : wW;
    this.h = wLtS ? wH : (wW * sAsp) / 100;
  }

  /** Clear surface. */
  cls() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  /**
   * @param {string} point Possible values:
   *                           "top left",    "top center",    "top right",
   *                        "middle left", "middle center", "middle right",
   *                        "bottom left", "bottom center", "bottom right".
   */
  posOf(point) {
    switch (point) {
      default:
      case "top left":
        return new SAT.Vector();
      case "top center":
        return new SAT.Vector(MG.Utils.pxToUnits(this.w / 2, this), 0);
      case "top right":
        return new SAT.Vector(MG.Utils.pxToUnits(this.w / 2, this), 0);
      case "middle left":
        return new SAT.Vector(0, MG.Utils.pxToUnits(this.h / 2, this));
      case "middle center":
        return new SAT.Vector(
          MG.Utils.pxToUnits(this.w / 2, this),
          MG.Utils.pxToUnits(this.h / 2, this)
        );
      case "middle right":
        return new SAT.Vector(
          MG.Utils.pxToUnits(this.w, this),
          MG.Utils.pxToUnits(this.h / 2, this)
        );
      case "bottom left":
        return new SAT.Vector(0, MG.Utils.pxToUnits(this.h, this));
      case "bottom center":
        return new SAT.Vector(
          MG.Utils.pxToUnits(this.w / 2, this),
          MG.Utils.pxToUnits(this.h, this)
        );
      case "bottom right":
        return new SAT.Vector(
          MG.Utils.pxToUnits(this.w, this),
          MG.Utils.pxToUnits(this.h, this)
        );
    }
  }
}

export default Surface;
