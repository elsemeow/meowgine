/** Utils class has no constructor and contains static utility methods only. */
class Utils {
  // Math
  // -------------------------------------------------------------

  /**
   * Normalization.
   * @param {number} value
   * @param {number} min
   * @param {number} max
   */
  static norm(value, min, max) {
    return (value - min) / (max - min);
  }

  /**
   * Linear interpolation.
   * @param {number} norm
   * @param {number} min
   * @param {number} max
   */
  static lerp(norm, min, max) {
    return (max - min) * norm + min;
  }

  /**
   * Keeps value between min and max.
   * @param {number} value
   * @param {number} min
   * @param {number} max
   */
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Randomization
  // -------------------------------------------------------------

  /**
   * @param {number} min
   * @param {number} max
   */
  static randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  /**
   * @param {number} min
   * @param {number} max
   */
  static randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  /**
   * @param {Object[]} array
   * @param {*} array.value
   * @param {number} array.chance
   */
  static weightedRandom(array) {
    let total = 0;

    for (let i = 0; i < array.length; i++) {
      total += array[i].chance;
    }

    let rand = Math.random() * total;

    for (let i = 0; i < array.length; i++) {
      const events = array[i];

      if (rand < events.chance) {
        return events.value;
      }

      rand -= events.chance;
    }
  }

  /**
   * @param {Array} array
   */
  static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * i);
      const temp = array[i];

      array[i] = array[rand];
      array[rand] = temp;
    }

    return array;
  }

  // Converters
  // -------------------------------------------------------------

  /**
   * @param {number} value
   * @param {number} sourceMin
   * @param {number} sourceMax
   * @param {number} destMax
   * @param {number} destMin
   */
  static map(value, sourceMin, sourceMax, destMin, destMax) {
    return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax);
  }

  /**
   * Convert degrees to radians.
   * @param {number} degrees
   */
  static degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Convert radians to degrees.
   * @param {number} radians
   */
  static radToDeg(radians) {
    return radians * (180 / Math.PI);
  }

  /**
   * @param {number} value
   * @param {number} places
   */
  static roundToPlaces(value, places) {
    const mult = Math.pow(10, places);
    return Math.round(value * mult) / mult;
  }

  /**
   * Units to pixels.
   * @param {number} value
   * @param {MG.Surface} surface
   */
  static u2p(value, surface) {
    switch (surface.units) {
      default:
      case "vmin":
        return this.map(value, 0, 100, 0, Math.min(surface.w, surface.h));
      case "vmax":
        return this.map(value, 0, 100, 0, Math.max(surface.w, surface.h));
    }
  }

  /**
   * Pixels to units.
   * @param {number} value
   * @param {MG.Surface} surface
   */
  static p2u(value, surface) {
    switch (surface.units) {
      default:
      case "vmin":
        return this.map(value, 0, Math.min(surface.w, surface.h), 0, 100);
      case "vmax":
        return this.map(value, 0, Math.max(surface.w, surface.h), 0, 100);
    }
  }

  /**
   * @param {SAT.Vector} pos
   * @param {number} r
   */
  static circleToPath(pos, r) {
    return ("M " + pos.x + " " + pos.y + " m -" + r + ", 0 a " + r + "," + r + " 0 1,0 " + r * 2 + ",0 a " + r + "," + r + " 0 1,0 -" + r * 2 + ",0");
  }

  /**
   * @param {SAT.Vector} pos
   * @param {SAT.Vector[]} points
   */
  static polygonToPath(pos, points) {
    let result = "M" + pos.x + " " + pos.y;

    result += "M" + (pos.x + points[0].x) + " " + (pos.y + points[0].y);

    for (let i = 1; i < points.length; i++) {
      const point = points[i];

      result += "L" + (pos.x + point.x) + " " + (pos.y + point.y);
    }

    result += "Z";

    return result;
  }

  /**
   * @param {SAT.Vector} pos
   * @param {number} w
   * @param {number} h
   */
  static boxToPath(pos, w, h) {
    return ("M" + pos.x + " " + pos.y + " h " + w + " v " + h + " h -" + w + " Z");
  }

  // Animations
  // -------------------------------------------------------------

  /**
   * @param {number} value
   * @param {number} target
   * @param {number} ease
   */
  static ease(value, target, ease) {
    const dv = target - value;

    value += dv * ease;

    if (Math.abs(dv) < 0.1) {
      value = target;
    }
  }

  /**
   * @param {SAT.Vector} position
   * @param {SAT.Vector} target
   * @param {number} ease
   */
  static easePos(position, target, ease) {
    const dx = target.x - position.x;
    const dy = target.y - position.y;

    position.x += dx * ease;
    position.y += dy * ease;

    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      position.x = target.x;
      position.y = target.y;
    }
  }
}

module.exports = Utils;
