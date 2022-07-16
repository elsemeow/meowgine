class Tilemap {
  /**
   * @param {Object} [options]
   * @param {string} [options.img] - Instance of image (e.g. image from another
   *                                 sprite or tilemap instance).
   * @param {string} [options.src] - Path to source.
   * @param {number} [options.sR] - Source tiles rows.
   * @param {number} [options.sC] - Source tiles columns.
   * @param {number} [options.sW] - Source width (px).
   * @param {number} [options.sH] - Source height (px).
   * @param {number} [options.dx] - Start of top left corner x (units).
   * @param {number} [options.dy] - Start of top left corner y (units).
   * @param {number} [options.dW] - Scaled width (units).
   * @param {number} [options.dH] - Scaled height (units).
   * @param {number} [options.rows] - Tilemap rows.
   * @param {number} [options.columns] - Tilemap columns.
   * @param {number[]} [options.tilemap]
   */
  constructor(options = {}) {
    let {
      img     = new Image(),
      src     = "",
      sR      = 0,
      sC      = 0,
      sW      = 0,
      sH      = 0,
      dx      = 0,
      dy      = 0,
      dW      = 0,
      dH      = 0,
      rows    = 0,
      cols    = 0,
      tilemap = [],
    } = options;

    this.sR      = sR;
    this.sC      = sC;
    this.sW      = sW;
    this.sH      = sH;
    this.dx      = dx;
    this.dy      = dy;
    this.dW      = dW;
    this.dH      = dH;
    this.rows    = rows;
    this.cols    = cols;
    this.tilemap = tilemap;
    this.img     = img;
    this.img.src = img.src || src;
  }

  /**
   * @param {Surface} surface
   */
  u2p(surface) {
    this.dx = MG.Utils.u2p(this.dx, surface);
    this.dy = MG.Utils.u2p(this.dy, surface);
    this.dW = MG.Utils.u2p(this.dW, surface);
    this.dH = MG.Utils.u2p(this.dH, surface);
  }

  /**
   * @param {Surface} surface
   */
  p2u(surface) {
    this.dx = MG.Utils.p2u(this.dx, surface);
    this.dy = MG.Utils.p2u(this.dy, surface);
    this.dW = MG.Utils.p2u(this.dW, surface);
    this.dH = MG.Utils.p2u(this.dH, surface);
  }

  /**
   * @param {Surface} surface
   */
  render(surface) {
    if (this.img.complete && this.img.naturalHeight !== 0) {
      let i = 0;
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          surface.ctx.drawImage(
            this.img,
            (this.tilemap[i] % this.sC) * this.sW,
            Math.floor(this.tilemap[i] / this.sR) * this.sH,
            this.sW,
            this.sH,
            this.dx + col * this.dW,
            this.dy + row * this.dH,
            this.dW,
            this.dH
          );
          i++;
        }
      }
    }
  }
}

module.exports = Tilemap;
