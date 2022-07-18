class Camera {
  /**
   * @param {SAT.Vector} pos - Origin (units).
   */
  constructor(pos) {
    this.pos = pos;
  }

  /**
   * @param {MG.Surface} surface
   */
  open(surface) {
    surface.ctx.translate(surface.w / 2 - this.pos.x, surface.h / 2 - this.pos.y);
  }

  /**
   * @param {MG.Surface} surface
   */
  close(surface) {
    surface.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  /**
   * @param {SAT.Vector} target
   * @param {number} ease
   */
  pinTo(target, ease) {
    MG.Utils.easePos(this.pos, target, ease);
  }

  /**
   * @param {MG.Surface} surface
   */
  u2p(surface) {
    this.pos = new SAT.V(
      MG.Utils.u2p(this.pos.x, surface),
      MG.Utils.u2p(this.pos.y, surface)
    );
  }

  /**
   * @param {MG.Surface} surface
   */
  p2u(surface) {
    this.pos = new SAT.V(
      MG.Utils.p2u(this.pos.x, surface),
      MG.Utils.p2u(this.pos.y, surface)
    );
  }

  /**
   * @param {MG.Surface} surface
   * @param {Object} [origin]
   * @param {boolean} [origin.hasBorder]
   * @param {string} [origin.borderWidth]
   * @param {string} [origin.borderColor]
   * @param {number} [origin.r]
   */
  render(surface, origin = {}) {
    const o = {
      hasBorder:   origin.hasBorder || false,
      borderWidth: origin.borderWidth || 2,
      borderColor: origin.borderColor || "rgba(255, 204, 92, 0.78)",
      r:           origin.r || 10,
    };

    if (o.hasBorder) {
      const p = new Path2D(MG.Utils.circleToPath(this.pos, o.r));

      surface.ctx.lineWidth = o.borderWidth;
      surface.ctx.strokeStyle = o.borderColor;
      surface.ctx.stroke(p);
    }
  }
}

module.exports = Camera;
