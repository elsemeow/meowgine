/**
 * @description Particle with physical properties
 */
class Particle {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} speed - speed of Particle
   * @param {number} direction - Particle's direction of movement in radians
   * @param {number} gravity - optional, affects y coordinate of Particle
   */
  constructor(x, y, speed, direction, gravity) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(direction) * speed;
    this.vy = Math.sin(direction) * speed;
    this.gravity = gravity || 0;
    this.radius = 0;
    this.mass = 1;
    this.bounce = -1;
    this.friction = 1;
    this.springs = [];
    this.gravitations = [];
  }

  // -------------------------------------------------------------
  // | Getters
  // -------------------------------------------------------------

  /**
   * @returns speed of Particle
   */
  get speed() {
    return Math.sqrt(this.vx ** 2 + this.vy ** 2);
  }

  /**
   * @returns Particle's direction of movement in radians
   */
  get direction() {
    return Math.atan2(this.vy, this.vx);
  }

  // -------------------------------------------------------------
  // | Setters
  // -------------------------------------------------------------

  /**
   * @param {number} speed - of Particle
   */
  set speed(speed) {
    this.vx = Math.cos(this.direction) * speed;
    this.vy = Math.sin(this.direction) * speed;
  }

  /**
   * @param {number} direction - Particle's direction of movement in radians
   */
  set direction(direction) {
    this.vx = Math.cos(direction) * this.speed;
    this.vy = Math.sin(direction) * this.speed;
  }

  // -------------------------------------------------------------
  // | Methods
  // -------------------------------------------------------------

  /**
   * @description Updates coordinates of Particle
   */
  update() {
    this._handleSprings();
    this._handleGravitations();
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  }

  /**
   * @param {number} ax - acceleration along x axis
   * @param {number} ay - acceleration along y axis
   * @description Accelerates Particle
   */
  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }

  /**
   * @param {object} p
   * @returns angle from Particle to point in radians
   */
  angleTo(p) {
    return Math.atan2(p.y - this.y, p.x - this.x);
  }

  /**
   * @param {object} p
   * @returns distance from Particle to point
   */
  distanceTo(p) {
    const dx = p.x - this.x;
    const dy = p.y - this.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  /**
   * @param {object} p
   * @param {number} k - factor of spring's stiffness
   * @param {number} length - of spring
   * @description Creates spring from Particle to point
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
   * @param {object} p
   * @description Removes spring from Particle to point
   */
  removeSpring(p) {
    for (let i = this.springs.length - 1; i >= 0; i--) {
      if (p === this.springs[i].p) {
        this.springs.splice(i, 1);
        return;
      }
    }
  }

  /**
   * @description Private method for springs handling
   */
  _handleSprings() {
    for (let i = this.springs.length - 1; i >= 0; i--) {
      const spring = this.springs[i];

      this._springTo(spring.p, spring.k, spring.length);
    }
  }

  /**
   * @param {object} p
   * @param {number} k - factor of spring's stiffness
   * @param {number} length - of spring
   * @description Private method for springs handling
   */
  _springTo(p, k, length) {
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const springForce = (distance - length || 0) * k;

    this.vx += (dx / distance) * springForce;
    this.vy += (dy / distance) * springForce;
  }

  /**
   * @param {object} anotherParticle
   * @description Creates gravitation between Particle and another Particle
   */
  addGravitation(anotherParticle) {
    this.removeGravitation(anotherParticle);
    this.gravitations.push(anotherParticle);
  }

  /**
   * @param {object} anotherParticle
   * @description Removes gravitation between Particle and another Particle
   */
  removeGravitation(anotherParticle) {
    for (let i = this.gravitations.length - 1; i >= 0; i--) {
      if (anotherParticle === this.gravitations[i]) {
        this.gravitations.splice(i, 1);
        return;
      }
    }
  }

  /**
   * @description Private method for gravitations handling
   */
  _handleGravitations() {
    for (let i = this.gravitations.length - 1; i >= 0; i--) {
      this._gravitateTo(this.gravitations[i]);
    }
  }

  /**
   * @param {object} anotherParticle
   * @description Private method for gravitations handling
   */
  _gravitateTo(anotherParticle) {
    const dx = anotherParticle.x - this.x;
    const dy = anotherParticle.y - this.y;
    const distSQ = dx ** 2 + dy ** 2;
    const dist = Math.sqrt(distSQ);
    const force = anotherParticle.mass / distSQ;
    const ax = (dx / dist) * force;
    const ay = (dy / dist) * force;

    this.vx += ax;
    this.vy += ay;
  }
}

module.exports = Particle;
