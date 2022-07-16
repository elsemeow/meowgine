class Background {
  /**
   * @param {Object} [options]
   * @param {string} [options.img] - Instance of image.
   * @param {string} [options.src] - Path to source.
   * @param {number} [options.sW] - Source width (px).
   * @param {number} [options.sH] - Source height (px).
   * @param {SAT.Vector} [options.pos] - Origin (units).
   * @param {number} [options.dW] - Scaled width (units).
   * @param {number} [options.dH] - Scaled height (units).
   * @param {number} [options.rows] - Tilemap rows.
   * @param {number} [options.columns] - Tilemap columns.
   * @param {number[]} [options.tilemap]
   */
  constructor(options = {}) {
    let {
      img = new Image(),
      src = "",
      sW  = 0,
      sH  = 0,
      pos = new SAT.V(),
      dW  = 0,
      dH  = 0,
    } = options;

    this.sW      = sW;
    this.sH      = sH;
    this.pos     = pos;
    this.dW      = dW;
    this.dH      = dH;
    this.img     = img;
    this.img.src = img.src || src;
  }

  /**
   * @param {Object} target
   * @param {number} target.x
   * @param {number} target.y
   * @param {number} ease
   */
  pinTo(target, ease) {
    MG.Utils.easePos(this.pos, target, ease);
  }

  /**
   * @param {Surface} surface
   */
  u2p(surface) {
    this.pos = new SAT.V(
      MG.Utils.u2p(this.pos.x, surface),
      MG.Utils.u2p(this.pos.y, surface)
    );

    this.dW = MG.Utils.u2p(this.dW, surface);
    this.dH = MG.Utils.u2p(this.dH, surface);
  }

  /**
   * @param {Surface} surface
   */
  p2u(surface) {
    this.pos = new SAT.V(
      MG.Utils.p2u(this.pos.x, surface),
      MG.Utils.p2u(this.pos.y, surface)
    );

    this.dW = MG.Utils.p2u(this.dW, surface);
    this.dH = MG.Utils.p2u(this.dH, surface);
  }

  /**
   * @param {Surface} surface
   */
  render(surface) {
    if (this.img.complete && this.img.naturalHeight !== 0) {
      surface.ctx.drawImage(
        this.img,
        0,
        0,
        this.sW,
        this.sH,
        this.pos.x - this.dW / 2,
        this.pos.y - this.dH / 2,
        this.dW,
        this.dH
      );
    }
  }
}

module.exports = Background;
