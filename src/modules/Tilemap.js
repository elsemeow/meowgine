class Tilemap {
  /**
   * @param {Object} [options]
   * @param {Image} [options.img] - Instance of image (e.g. image from another
   *                                sprite or tilemap instance).
   * @param {string} [options.src] - Path to source.
   * @param {number} [options.sR] - Source tiles rows.
   * @param {number} [options.sC] - Source tiles columns.
   * @param {number} [options.sW] - Source width (px).
   * @param {number} [options.sH] - Source height (px).
   * @param {SAT.Vector} [options.pos] - Top left corner start position (units).
   * @param {number} [options.dW] - Scaled width (units).
   * @param {number} [options.dH] - Scaled height (units).
   * @param {number} [options.rows] - Tilemap rows.
   * @param {number} [options.cols] - Tilemap columns.
   * @param {Object[]} [options.tilemap]
   * @param {number} [options.tilemap.x]
   * @param {number} [options.tilemap.y]
   */
  constructor(options = {}) {
    let {
      img     = new Image(),
      src     = "",
      sR      = 0,
      sC      = 0,
      sW      = 0,
      sH      = 0,
      pos     = new SAT.V(),
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
    this.pos     = pos;
    this.dW      = dW;
    this.dH      = dH;
    this.rows    = rows;
    this.cols    = cols;
    this.tilemap = tilemap;
    this.img     = img;
    this.img.src = img.src || src;
  }

  /**
   * @param {MG.Surface} surface
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
   * @param {MG.Surface} surface
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
   * @param {MG.Surface} surface
   */
  render(surface) {
    if (this.img.complete && this.img.naturalHeight !== 0) {
      let i = 0;
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          surface.ctx.drawImage(
            this.img,
            this.tilemap[i].x * this.sW,
            this.tilemap[i].y * this.sH,
            this.sW,
            this.sH,
            this.pos.x + col * this.dW,
            this.pos.y + row * this.dH,
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
