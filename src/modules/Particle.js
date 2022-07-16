class Particle {
  #result;

  /**
   * @param {number} speed
   * @param {number} direction - Direction in radians.
   * @param {Object} [options]
   * @param {number} [options.gravity]
   * @param {number} [options.mass]
   * @param {number} [options.bounce]
   * @param {number} [options.friction]
   */
  constructor(speed = 0, direction = 0, options = {}) {
    this.x  = 0;
    this.y  = 0;
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;

    let { gravity = 0, mass = 1, bounce = -1, friction = 1 } = options;

    this.gravity      = gravity;
    this.mass         = mass;
    this.bounce       = bounce;
    this.friction     = friction;
    this.springs      = [];
    this.gravitations = [];
  }

  get speed() {
    return Math.sqrt(this.vx ** 2 + this.vy ** 2);
  }

  /**
   * @returns Direction in radians.
   */
  get direction() {
    return Math.atan2(this.vy, this.vx);
  }

  /**
   * @param {number} speed
   */
  set speed(speed) {
    this.vx = Math.cos(this.direction) * speed;
    this.vy = Math.sin(this.direction) * speed;
  }

  /**
   * @param {number} direction - Direction in radians.
   */
  set direction(direction) {
    this.vx = Math.cos(direction) * this.speed;
    this.vy = Math.sin(direction) * this.speed;
  }

  /**
   * @param {SAT.Vector} pos
   * @param {Surface} surface
   * @returns Updated particle coordinates in px, specified as a SAT.Vector.
   */
  update(pos, surface) {
    this.x = MG.Utils.p2u(pos.x, surface);
    this.y = MG.Utils.p2u(pos.y, surface);
    this.#handleSprings();
    this.#handleGravitations();
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.#result = new SAT.V(
      MG.Utils.u2p(this.x + this.vx, surface),
      MG.Utils.u2p(this.y + this.vy, surface)
    );

    return this.#result;
  }

  /**
   * @param {number} ax - Acceleration along x axis.
   * @param {number} ay - Acceleration along y axis.
   */
  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }

  /**
   * @param {Object} p
   * @param {number} p.x
   * @param {number} p.y
   * @returns Angle from particle to point in radians.
   */
  angleTo(p) {
    return Math.atan2(p.y - this.y, p.x - this.x);
  }

  /**
   * @param {Object} p
   * @param {number} p.x
   * @param {number} p.y
   * @returns Distance from particle to point.
   */
  distanceTo(p) {
    const dx = p.x - this.x;
    const dy = p.y - this.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  /**
   * Create spring from particle to point.
   * @param {Object} p
   * @param {number} p.x
   * @param {number} p.y
   * @param {number} k - Factor of spring's stiffness.
   * @param {number} length
   */
  addSpring(p, k, length) {
    this.removeSpring(p);
    this.springs.push({
      p: p,
      k: k,
      length: length || 0,
    });
  }

  /**
   * Remove spring from particle to point.
   * @param {Object} p
   * @param {number} p.x
   * @param {number} p.y
   */
  removeSpring(p) {
    for (let i = this.springs.length - 1; i >= 0; i--) {
      if (p === this.springs[i].p) {
        this.springs.splice(i, 1);

        return;
      }
    }
  }

  /** Private method for springs handling. */
  #handleSprings() {
    for (let i = this.springs.length - 1; i >= 0; i--) {
      const spring = this.springs[i];

      this.#springTo(spring.p, spring.k, spring.length);
    }
  }

  /**
   * Private method for springs handling.
   * @param {Object} p
   * @param {number} p.x
   * @param {number} p.y
   * @param {number} k - Factor of spring's stiffness.
   * @param {number} length
   */
  #springTo(p, k, length) {
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const springForce = (distance - length || 0) * k;

    this.vx += (dx / distance) * springForce;
    this.vy += (dy / distance) * springForce;
  }

  /**
   * Create gravitation between two particles.
   * @param {Particle} particle
   */
  addGravitation(particle) {
    this.removeGravitation(particle);
    this.gravitations.push(particle);
  }

  /**
   * Remove gravitation between two particles.
   * @param {Particle} particle
   */
  removeGravitation(particle) {
    for (let i = this.gravitations.length - 1; i >= 0; i--) {
      if (particle === this.gravitations[i]) {
        this.gravitations.splice(i, 1);

        return;
      }
    }
  }

  /** Private method for gravitations handling. */
  #handleGravitations() {
    for (let i = this.gravitations.length - 1; i >= 0; i--) {
      this.#gravitateTo(this.gravitations[i]);
    }
  }

  /**
   * Private method for gravitations handling.
   * @param {Particle} particle
   */
  #gravitateTo(particle) {
    const dx = particle.x - this.x;
    const dy = particle.y - this.y;
    const distSQ = dx ** 2 + dy ** 2;
    const dist = Math.sqrt(distSQ);
    const force = particle.mass / distSQ;
    const ax = (dx / dist) * force;
    const ay = (dy / dist) * force;

    this.vx += ax;
    this.vy += ay;
  }
}

module.exports = Particle;
