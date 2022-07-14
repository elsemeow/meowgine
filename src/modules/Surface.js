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
    this.selector  = selector;
    this.viewWport = viewWport;
    this.viewHport = viewHport;
    this.units     = units;

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
   * @param {string} val Possible values:
   *                     `tl`: top left,    `tc`: top center,    `tr`: top right,
   *                     `ml`: middle left, `mc`: middle center, `mr`: middle right,
   *                     `bl`: bottom left, `bc`: bottom center, `br`: bottom right.
   */
  pos(val) {
    switch (val) {
      default:
      case "tl":
        return new SAT.V();
      case "tc":
        return new SAT.V(MG.Utils.p2u(this.w / 2, this), 0);
      case "tr":
        return new SAT.V(MG.Utils.p2u(this.w / 2, this), 0);
      case "ml":
        return new SAT.V(0, MG.Utils.p2u(this.h / 2, this));
      case "mc":
        return new SAT.V(MG.Utils.p2u(this.w / 2, this), MG.Utils.p2u(this.h / 2, this));
      case "mr":
        return new SAT.V(MG.Utils.p2u(this.w, this), MG.Utils.p2u(this.h / 2, this));
      case "bl":
        return new SAT.V(0, MG.Utils.p2u(this.h, this));
      case "bc":
        return new SAT.V(MG.Utils.p2u(this.w / 2, this), MG.Utils.p2u(this.h, this));
      case "br":
        return new SAT.V(MG.Utils.p2u(this.w, this), MG.Utils.p2u(this.h, this));
    }
  }
}

export default Surface;
