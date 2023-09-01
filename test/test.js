const log = console.log;
const should = require('chai').should();
const assert = require('assert');

const Utilities = require('../src/modules/Utilities');

describe('#Utilities', () => {
  describe('#norm()', () => {
    it('should return 0.5', () => {
      assert.strictEqual(Utilities.norm(100, 0, 200), 0.5);
    });
  });

  describe('#lerp()', () => {
    it('should return 500', () => {
      assert.strictEqual(Utilities.lerp(0.5, 0, 1000), 500);
    });
  });

  describe('#clamp()', () => {
    it('should return 100', () => {
      assert.strictEqual(Utilities.clamp(500, -10, 100), 100);
    });
  });

  describe('#distance()', () => {
    it('should return 127.27922061357856', () => {
      assert.strictEqual(Utilities.distance({ x: 10, y: 10 }, { x: 100, y: 100 }), 127.27922061357856);
    });
  });

  describe('#distanceXY()', () => {
    it('should return 127.27922061357856', () => {
      assert.strictEqual(Utilities.distanceXY(10, 10, 100, 100), 127.27922061357856);
    });
  });

  describe('#inRange()', () => {
    it('should return false', () => {
      assert.strictEqual(Utilities.inRange(300, 10, 200), false);
    });
    it('should return true', () => {
      assert.strictEqual(Utilities.inRange(50, 10, 200), true);
    });
  });

  describe('#rangeIntersect()', () => {
    it('should return false', () => {
      assert.strictEqual(Utilities.rangeIntersect(150, 200, 0, 100), false);
    });
    it('should return true', () => {
      assert.strictEqual(Utilities.rangeIntersect(-10, 50, 0, 100), true);
    });
  });

  describe('#circleIntersect()', () => {
    it('should return false', () => {
      assert.strictEqual(
        Utilities.circleIntersect({ x: 100, y: 100, radius: 20 }, { x: 50, y: 50, radius: 20 }),
        false,
      );
    });
    it('should return true', () => {
      assert.strictEqual(Utilities.circleIntersect({ x: 100, y: 100, radius: 50 }, { x: 50, y: 50, radius: 50 }), true);
    });
  });

  describe('#circlePointIntersect()', () => {
    it('should return false', () => {
      assert.strictEqual(Utilities.circlePointIntersect(45, 45, { x: 100, y: 100, radius: 50 }), false);
    });
    it('should return true', () => {
      assert.strictEqual(Utilities.circlePointIntersect(70, 70, { x: 100, y: 100, radius: 50 }), true);
    });
  });

  describe('#rectIntersect()', () => {
    it('should return false', () => {
      assert.strictEqual(
        Utilities.rectIntersect({ x: 130, y: 230, width: 200, height: 100 }, { x: 20, y: 20, width: 100, height: 200 }),
        false,
      );
    });
    it('should return true', () => {
      assert.strictEqual(
        Utilities.rectIntersect({ x: 10, y: 10, width: 200, height: 100 }, { x: 20, y: 20, width: 100, height: 200 }),
        true,
      );
    });
  });

  describe('#rectPointIntersect()', () => {
    it('should return false', () => {
      assert.strictEqual(Utilities.rectPointIntersect(10, 10, { x: 20, y: 20, width: 100, height: 200 }), false);
    });
    it('should return true', () => {
      assert.strictEqual(Utilities.rectPointIntersect(50, 50, { x: 20, y: 20, width: 100, height: 200 }), true);
    });
  });

  describe('#circleRectIntersect()', () => {
    it('should return false', () => {
      assert.strictEqual(
        Utilities.circleRectIntersect({ x: 50, y: 50, radius: 70 }, { x: 125, y: 20, width: 100, height: 200 }),
        false,
      );
    });
    it('should return true', () => {
      assert.strictEqual(
        Utilities.circleRectIntersect({ x: 50, y: 50, radius: 70 }, { x: 20, y: 20, width: 100, height: 200 }),
        true,
      );
    });
  });

  describe('#randomRange()', () => {
    it('should return a number between 10 and 100', () => {
      const number = Utilities.randomRange(10, 100);
      log(`      number: ${number}`);
      (number >= 10 && number <= 100).should.be.true;
    });
  });

  describe('#randomInt()', () => {
    it('should return a number between 10 and 100', () => {
      const number = Utilities.randomInt(10, 100);
      log(`      number: ${number}`);
      (number >= 10 && number <= 100).should.be.true;
    });
  });

  describe('#weightedRandom()', () => {
    it('should return "rotten chicken" or "chest"', () => {
      const randomValue = Utilities.weightedRandom([
        { value: 'rotten chicken', chance: 10 },
        { value: 'chest', chance: 1 },
      ]);
      log(`      random value: {${typeof randomValue}} ${randomValue}`);
      (randomValue === 'rotten chicken' || randomValue === 'chest').should.be.true;
    });
  });

  describe('#shuffleArray()', () => {
    it('should return shuffled array with length equal to length of array passed in argument', () => {
      const shuffledArray = Utilities.shuffleArray([0, 1, 2, 3, 4, 5]);
      log(`      shuffled array: ${shuffledArray}`);
      (shuffledArray.length === 6).should.be.true;
    });
  });

  describe('#map()', () => {
    it('should return 50', () => {
      assert.strictEqual(Utilities.map(5, 0, 100, 0, 1000), 50);
    });
  });

  describe('#degToRad()', () => {
    it('should return 1.5707963267948966', () => {
      assert.strictEqual(Utilities.degToRad(90), 1.5707963267948966);
    });
  });

  describe('#radToDeg()', () => {
    it('should return 90', () => {
      assert.strictEqual(Utilities.radToDeg(Math.PI / 2), 90);
    });
  });

  describe('#roundToPlaces()', () => {
    it('should return 3.14', () => {
      assert.strictEqual(Utilities.roundToPlaces(Math.PI, 2), 3.14);
    });
  });
});
