class Camera {
  /**
   * @param {SAT.Vector} pos - Origin (units).
   */
  constructor(pos) {
    this.pos = pos;
  }

  /**
   * @param {Surface} surface
   */
  open(surface) {
    surface.ctx.translate(surface.w / 2 - this.pos.x, surface.h / 2 - this.pos.y);
  }

  /**
   * @param {Surface} surface
   */
  close(surface) {
    surface.ctx.setTransform(1, 0, 0, 1, 0, 0);
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
  }

  /**
   * @param {Surface} surface
   */
  p2u(surface) {
    this.pos = new SAT.V(
      MG.Utils.p2u(this.pos.x, surface),
      MG.Utils.p2u(this.pos.y, surface)
    );
  }

  /**
   * @param {Surface} surface
   * @param {Object} [center]
   * @param {boolean} [center.hasBorder]
   * @param {string} [center.borderWidth]
   * @param {string} [center.borderColor]
   * @param {number} [center.r]
   */
  render(surface, center = {}) {
    const c = {
      hasBorder:   center.hasBorder || false,
      borderWidth: center.borderWidth || 2,
      borderColor: center.borderColor || "rgb(255, 204, 92, 0.78)",
      r:           center.r || 10,
    };

    if (c.hasBorder) {
      p = new Path2D(MG.Utils.circleToPath(this.pos, c.r));

      surface.ctx.lineWidth = c.borderWidth;
      surface.ctx.strokeStyle = c.borderColor;
      surface.ctx.stroke(p);
    }
  }
}

module.exports = Camera;
