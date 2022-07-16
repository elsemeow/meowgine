/**
 * Two-dimensional bitmap without spaces between frames and offsets.
 * Stripes should be placed horizontally only, e.g. from `| 1, 1 |` to `| 1, 2 |`.
 *
 * ```
 * | 0, 0 | 0, 1 | 0, 2 |
 * | 1, 0 | 1, 1 | 1, 2 |
 * | 2, 0 | 2, 1 | 2, 2 |
 * ```
 */
class Sprite {
  #lifetime = 0;

  /**
   * @param {Object} [options]
   * @param {string} [options.img] - Instance of image (e.g. image from another
   *                                 sprite or tilemap instance).
   * @param {string} [options.src] - Path to source.
   * @param {number} [options.ix] - Horizontal index.
   * @param {number} [options.iy] - Vertical index.
   * @param {number} [options.sW] - Source width (px).
   * @param {number} [options.sH] - Source height (px).
   * @param {number} [options.dxS] - Horizontal origin shift for current frame (units).
   * @param {number} [options.dyS] - Vertical origin shift for current frame (units).
   * @param {number} [options.dW] - Width of current frame (units).
   * @param {number} [options.dH] - Height of current frame (units).
   * @param {number} [options.frames] - Number of frames for current stripe (`iy`).
   * @param {number} [options.speed] - Animation speed in frames per second (fps).
   */
  constructor(options = {}) {
    let {
      img    = new Image(),
      src    = "",
      ix     = 0,
      iy     = 0,
      sW     = 0,
      sH     = 0,
      dxS    = 0,
      dyS    = 0,
      dW     = 0,
      dH     = 0,
      frames = 0,
      speed  = 30,
    } = options;

    this.ix      = ix;
    this.iy      = iy;
    this.sW      = sW;
    this.sH      = sH;
    this.dxS     = dxS;
    this.dyS     = dyS;
    this.dW      = dW;
    this.dH      = dH;
    this.frames  = frames;
    this.speed   = speed;
    this.ixLast  = ix;
    this.img     = img;
    this.img.src = img.src || src;
  }

  /**
   * @param {SAT.Circle|SAT.Polygon|SAT.Box} collision
   * @param {Surface} surface
   * @param {number} [angle] - In radians, if collision have no it's own.
   */
  render(collision, surface, angle = 0) {
    if (this.img.complete && this.img.naturalHeight !== 0) {

      // Stripe animation.
      if (this.speed > 0) {
        if (Date.now() - this.#lifetime >= 1000 / this.speed) {
          this.ixLast += 1;

          if (this.ixLast >= this.ix + this.frames) this.ixLast = this.ix;

          this.#lifetime = Date.now();
        }
      }

      surface.ctx.save();

      surface.ctx.translate(collision.pos.x, collision.pos.y);
      surface.ctx.rotate(collision.angle || angle);
      surface.ctx.translate(-collision.pos.x, -collision.pos.y);

      surface.ctx.drawImage(
        this.img,
        this.ixLast * this.sW,
        this.iy * this.sH,
        this.sW,
        this.sH,
        collision.pos.x + this.dxS, surface,
        collision.pos.y + this.dyS, surface,
        this.dW,
        this.dH
      );

      surface.ctx.restore();
    }
  }
}

module.exports = Sprite;
