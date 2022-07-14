class Entity {
  /**
   * @param {string} origin Possible values:
   *                           "top left",    "top center",    "top right",
   *                        "middle left", "middle center", "middle right",
   *                        "bottom left", "bottom center", "bottom right".
   * @param {SAT.Circle|SAT.Polygon|SAT.Polygon} collision
   * @param {Particle} particle
   * @param {Sprite} sprite
   * @param {Object} vars
   */
  constructor(origin, collision, particle, sprite, vars = {}) {
    this.origin = origin;
    this.collision = collision;
    this.particle = particle;
    this.sprite = sprite;
    this.vars = vars;

    this.#initOrigin();
  }

  get type() {
    // Detect circle.
    if (typeof this.collision.r !== "undefined") {
      return "circle";
    }

    // Detect polygon.
    if (typeof this.collision.calcPoints !== "undefined") {
      return "polygon";
    }

    // Detect box.
    if (typeof this.collision.w !== "undefined") {
      return "box";
    }
  }

  get #collisionPath() {
    if (this.type === "circle") {
      return MG.Utils.circleToPath(this.collision.pos, this.collision.r);
    }

    if (this.type === "polygon") {
      return MG.Utils.polygonToPath(
        this.collision.pos,
        this.collision.calcPoints
      );
    }

    if (this.type === "box") {
      return MG.Utils.boxToPath(
        this.collision.pos,
        this.collision.w,
        this.collision.h
      );
    }
  }

  #initOrigin() {
    if (this.type === "circle") {
      this.sprite.dxS += -this.sprite.dW / 2;
      this.sprite.dyS += -this.sprite.dH / 2;
    }

    if (this.type === "polygon") {
      const center = this.collision.getCentroid();
      const box = this.collision.getAABBAsBox();

      switch (this.origin) {
        default:
        case "top left":
          this.collision.setOffset(new SAT.Vector(0, 0));
          this.sprite.dxS += -this.sprite.dW / 2 + box.w / 2;
          this.sprite.dyS += -this.sprite.dH / 2 + box.h / 2;
          break;
        case "top center":
          this.collision.setOffset(new SAT.Vector(-center.x, 0));
          this.sprite.dxS += -this.sprite.dW / 2;
          this.sprite.dyS += -this.sprite.dH / 2 + box.h / 2;
          break;
        case "top right":
          this.collision.setOffset(new SAT.Vector(-box.w, 0));
          this.sprite.dxS += -this.sprite.dW / 2 - box.w / 2;
          this.sprite.dyS += -this.sprite.dH / 2 + box.h / 2;
          break;
        case "middle left":
          this.collision.setOffset(new SAT.Vector(0, -center.y));
          this.sprite.dxS += -this.sprite.dW / 2 + box.w / 2;
          this.sprite.dyS += -this.sprite.dH / 2;
          break;
        case "middle center":
          this.collision.setOffset(new SAT.Vector(-center.x, -center.y));
          this.sprite.dxS += -this.sprite.dW / 2;
          this.sprite.dyS += -this.sprite.dH / 2;
          break;
        case "middle right":
          this.collision.setOffset(new SAT.Vector(-box.w, -center.y));
          this.sprite.dxS += -this.sprite.dW / 2 - box.w / 2;
          this.sprite.dyS += -this.sprite.dH / 2;
          break;
        case "bottom left":
          this.collision.setOffset(new SAT.Vector(0, -box.h));
          this.sprite.dxS += -this.sprite.dW / 2 + box.w / 2;
          this.sprite.dyS += -this.sprite.dH / 2 - box.h / 2;
          break;
        case "bottom center":
          this.collision.setOffset(new SAT.Vector(-center.x, -box.h));
          this.sprite.dxS += -this.sprite.dW / 2;
          this.sprite.dyS += -this.sprite.dH / 2 - box.h / 2;
          break;
        case "bottom right":
          this.collision.setOffset(new SAT.Vector(-box.w, -box.h));
          this.sprite.dxS += -this.sprite.dW / 2 - box.w / 2;
          this.sprite.dyS += -this.sprite.dH / 2 - box.h / 2;
          break;
      }
    }

    if (this.type === "box") {
      this.sprite.dxS += -this.sprite.dW / 2 + this.collision.w / 2;
      this.sprite.dyS += -this.sprite.dH / 2 + this.collision.h / 2;
    }
  }

  /**
   * @param {Surface} surface
   */
  beforeResize(surface) {
    this.collision.pos = new SAT.Vector(
      MG.Utils.pxToUnits(this.collision.pos.x, surface),
      MG.Utils.pxToUnits(this.collision.pos.y, surface)
    );

    if (this.type === "circle") {
      this.collision.r = MG.Utils.pxToUnits(this.collision.r, surface);
    }

    if (this.type === "polygon") {
      let points = [];

      this.collision.setOffset(
        new SAT.Vector(
          MG.Utils.pxToUnits(this.collision.offset.x, surface),
          MG.Utils.pxToUnits(this.collision.offset.y, surface)
        )
      );

      for (let i = 0; i < this.collision.points.length; i++) {
        points.push(
          new SAT.Vector(
            MG.Utils.pxToUnits(this.collision.points[i].x, surface),
            MG.Utils.pxToUnits(this.collision.points[i].y, surface)
          )
        );
      }
      this.collision.setPoints(points);
    }

    if (this.type === "box") {
      this.collision.w = MG.Utils.pxToUnits(this.collision.w, surface);
      this.collision.h = MG.Utils.pxToUnits(this.collision.h, surface);
    }
  }

  /**
   * @param {Surface} surface
   */
  afterResize(surface) {
    this.collision.pos = new SAT.Vector(
      MG.Utils.unitsToPx(this.collision.pos.x, surface),
      MG.Utils.unitsToPx(this.collision.pos.y, surface)
    );

    if (this.type === "circle") {
      this.collision.r = MG.Utils.unitsToPx(this.collision.r, surface);
    }

    if (this.type === "polygon") {
      let points = [];

      this.collision.setOffset(
        new SAT.Vector(
          MG.Utils.unitsToPx(this.collision.offset.x, surface),
          MG.Utils.unitsToPx(this.collision.offset.y, surface)
        )
      );

      for (let i = 0; i < this.collision.points.length; i++) {
        points.push(
          new SAT.Vector(
            MG.Utils.unitsToPx(this.collision.points[i].x, surface),
            MG.Utils.unitsToPx(this.collision.points[i].y, surface)
          )
        );
      }
      this.collision.setPoints(points);
    }

    if (this.type === "box") {
      this.collision.w = MG.Utils.unitsToPx(this.collision.w, surface);
      this.collision.h = MG.Utils.unitsToPx(this.collision.h, surface);
    }
  }

  /**
   * Synchronize position of collision with position of particle.
   * @param {Surface} surface
   */
  syncPos(surface) {
    this.collision.pos = this.particle.update(this.collision.pos, surface);
  }

  /** Synchronize angle of collision with direction of particle.  */
  syncAngle() {
    e.collision.setAngle(this.particle.direction);
  }

  /**
   * Visualize collision geometry and origin point for debugging.
   * @param {Surface} surface
   * @param {Object} [collision]
   * @param {boolean} [collision.hasFill]
   * @param {boolean} [collision.hasBorder]
   * @param {number} [collision.borderWidth]
   * @param {string} [collision.borderColor]
   * @param {string} [collision.fillColor]
   * @param {Object} [origin]
   * @param {boolean} [origin.hasFill]
   * @param {string} [origin.fillColor]
   * @param {number} [origin.r]
   */
  debugRender(surface, collision = {}, origin = {}) {
    const c = {
      hasFill: collision.hasFill || false,
      hasBorder: collision.hasBorder || false,
      borderWidth: collision.borderWidth || 2,
      borderColor: collision.borderColor || "rgb(150, 206, 180)",
      fillColor: collision.fillColor || "rgba(150, 206, 180, 0.78)",
    };

    const o = {
      hasFill: origin.hasFill || false,
      fillColor: origin.fillColor || "rgba(255, 111, 105, 0.78)",
      r: origin.r || 2,
    };

    let p = {};

    if (c.hasFill || c.hasBorder) {
      p = new Path2D(this.#collisionPath);

      if (c.hasFill) {
        surface.ctx.fillStyle = c.fillColor;
        surface.ctx.fill(p);
      }

      if (c.hasBorder) {
        surface.ctx.lineWidth = c.borderWidth;
        surface.ctx.strokeStyle = c.borderColor;
        surface.ctx.stroke(p);
      }
    }

    if (o.hasFill) {
      p = new Path2D(MG.Utils.circleToPath(this.collision.pos, o.r));

      surface.ctx.fillStyle = o.fillColor;
      surface.ctx.fill(p);
    }
  }
}

module.exports = Entity;
