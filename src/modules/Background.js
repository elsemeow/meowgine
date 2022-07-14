class Background {
  /**
   * @param {Object} [options]
   * @param {string} [options.img] Instance of image.
   * @param {string} [options.src] Path to source.
   * @param {number} [options.sW] Source width (px).
   * @param {number} [options.sH] Source height (px).
   * @param {SAT.Vector} [options.pos] Origin (px).
   * @param {number} [options.dW] Scaled width (units).
   * @param {number} [options.dH] Scaled height (units).
   * @param {number} [options.rows] Tilemap rows.
   * @param {number} [options.columns] Tilemap columns.
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
  render(surface) {
    if (this.img.complete && this.img.naturalHeight !== 0) {
      surface.ctx.drawImage(
        this.img,
        0,
        0,
        this.sW,
        this.sH,
        this.pos.x - MG.Utils.u2p(this.dW / 2, surface),
        this.pos.y - MG.Utils.u2p(this.dH / 2, surface),
        MG.Utils.u2p(this.dW, surface),
        MG.Utils.u2p(this.dH, surface)
      );
    }
  }
}

module.exports = Background;
