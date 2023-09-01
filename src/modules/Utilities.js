/**
 * @description This class has no constructor and contains static methods only
 */
class Utilities {
  // -------------------------------------------------------------
  // | Math
  // -------------------------------------------------------------

  /**
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @description Normalization
   */
  static norm(value, min, max) {
    return (value - min) / (max - min);
  }

  /**
   * @param {number} norm
   * @param {number} min
   * @param {number} max
   * @description Linear interpolation
   */
  static lerp(norm, min, max) {
    return (max - min) * norm + min;
  }

  /**
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @description Keeps value between min and max
   */
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * @param {object} p0
   * @param {object} p1
   * @description Distance between 2 points (Pythagorean Theorem)
   */
  static distance(p0, p1) {
    const dx = Math.abs(p1.x - p0.x);
    const dy = Math.abs(p1.y - p0.y);

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  /**
   * @param {number} x0
   * @param {number} y0
   * @param {number} x1
   * @param {number} y1
   * @description Distance between 2 points (Pythagorean Theorem)
   */
  static distanceXY(x0, y0, x1, y1) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);

    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  // -------------------------------------------------------------
  // | Collisions
  // -------------------------------------------------------------

  /**
   * @param {number} value
   * @param {number} min
   * @param {number} max
   */
  static inRange(value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  }

  /**
   * @param {number} min0
   * @param {number} max0
   * @param {number} min1
   * @param {number} max1
   */
  static rangeIntersect(min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
  }

  /**
   * @param {object} c0
   * @param {object} c1
   */
  static circleIntersect(c0, c1) {
    return this.distance(c0, c1) <= c0.radius + c1.radius;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {object} circle
   */
  static circlePointIntersect(x, y, circle) {
    return this.distanceXY(x, y, circle.x, circle.y) < circle.radius;
  }

  /**
   * @param {object} r0
   * @param {object} r1
   */
  static rectIntersect(r0, r1) {
    return (
      this.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
      this.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height)
    );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {object} rect
   */
  static rectPointIntersect(x, y, rect) {
    return this.inRange(x, rect.x, rect.x + rect.width) && this.inRange(y, rect.y, rect.y + rect.height);
  }

  /**
   * @param {object} circle
   * @param {object} rect
   */
  static circleRectIntersect(circle, rect) {
    const distX = Math.abs(circle.x - rect.x - rect.width / 2);
    const distY = Math.abs(circle.y - rect.y - rect.height / 2);
    const dx = distX - rect.width / 2;
    const dy = distY - rect.height / 2;

    if (distX > rect.width / 2 + circle.radius) {
      return false;
    }

    if (distY > rect.height / 2 + circle.radius) {
      return false;
    }

    if (distX <= rect.width / 2) {
      return true;
    }

    if (distY <= rect.height / 2) {
      return true;
    }

    return dx ** 2 + dy ** 2 <= circle.radius ** 2;
  }

  // -------------------------------------------------------------
  // | Randomization
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
   * @param {array} array
   * @description Weighted random, e.g.
   * ```
   * [{ value: "nothing!", chance: 10 }, { value: "a gold piece", chance: 1 }]
   * ```
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
   * @param {array} array
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

  // -------------------------------------------------------------
  // | Converters
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
   * @param {number} degrees
   * @description Convert degrees to radians
   */
  static degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /**
   * @param {number} radians
   * @description Convert radians to degrees
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
}

module.exports = Utilities;
