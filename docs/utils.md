# Utils

Utility methods class.

## Math

Normalization.

_The example below returns `0.5`._

```js
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
MG.Utils.norm(75, 50, 100);
```

Linear Interpolation.

_The example below returns `75`._

```js
/**
 * @param {number} norm
 * @param {number} min
 * @param {number} max
 */
MG.Utils.lerp(0.5, 50, 100);
```

This method keeps the `value` between `min` and `max`.

_The example below returns `100`._

```js
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
MG.Utils.clamp(105, 50, 100);
```

## Randomization

This method returns a random floating point number from `min` to `max`.

```js
/**
 * @param {number} min
 * @param {number} max
 */
MG.Utils.randomRange(10, 20);
```

This method returns returns a random integer from `min` to `max`.

```js
/**
 * @param {number} min
 * @param {number} max
 */
MG.Utils.randomInt(10, 20);
```

Weighted random.

This method returns a random `value` from an `array` with a given `chance`.

```js
/**
 * @param {Object[]} array
 * @param {*} array.value
 * @param {number} array.chance
 */
MG.Utils.weightedRandom([
  { value: "cheese", chance: 0.01 },
  { value: "carrot", chance: 0.5 },
]);
```

Shuffle array.

This method randomly swaps the elements of the given `array`.

```js
/**
 * @param {Array} array
 */
MG.Utils.shuffleArray([0, 1, 2, 3, 4, 5]);
```

## Converters

This method scale the `value` from the source range to the destination range.

_The example below returns `10`._

```js
/**
 * @param {number} value
 * @param {number} sourceMin
 * @param {number} sourceMax
 * @param {number} destMax
 * @param {number} destMin
 */
MG.Utils.map(0.1, 0, 1, 0, 100);
```

This method converts degrees to radians.

_The example below returns `1.5707963267948966` (Pi / 2)._

```js
/**
 * @param {number} degrees
 */
MG.Utils.degToRad(90);
```

This method converts radians to degrees.

_The example below returns `90`._

```js
/**
 * @param {number} radians
 */
MG.Utils.radToDeg(Math.PI / 2);
```

This method rounds the `value` to the specified precision (`places`).

_The example below returns `0.009`._

```js
/**
 * @param {number} value
 * @param {number} places
 */
MG.Utils.roundToPlaces(0.009333, 3);
```

This method converts the given `value` in `surface` units ("vmin" or "vmax") to pixels.

```js
/**
 * @param {number} value
 * @param {MG.Surface} surface
 */
MG.Utils.u2p(value, surface);
```

This method converts the given `value` in pixels to `surface` units ("vmin" or "vmax").

```js
/**
 * @param {number} value
 * @param {MG.Surface} surface
 */
MG.Utils.p2u(value, surface);
```

This method returns a circle with the given parameters as an SVG Path string.

_The example below returns `"M 10 10 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0"`._

```js
/**
 * @param {SAT.Vector} pos
 * @param {number} r
 */
MG.Utils.circleToPath(new SAT.V(10, 10), 5);
```

This method returns a polygon with the given parameters as an SVG Path string.

_The example below returns `"M50 50M50 50L60 50L60 65L50 65Z"`._

```js
/**
 * @param {SAT.Vector} pos
 * @param {SAT.Vector[]} points
 */
MG.Utils.polygonToPath(new SAT.V(50, 50), [
  new SAT.V(),
  new SAT.V(10, 0),
  new SAT.V(10, 15),
  new SAT.V(0, 15),
]);
```

This method returns a box (rectangle) with the given parameters as an SVG Path string.

_The example below returns `"M30 30 h 10 v 20 h -10 Z"`._

```js
/**
 * @param {SAT.Vector} pos
 * @param {number} w
 * @param {number} h
 */
MG.Utils.boxToPath(new SAT.V(30, 30), 10, 20);
```

## Animations

This method changes the given `value` to the `target` value with the given easing factor (`ease`).

```js
/**
 * @param {Object} value
 * @param {Object} target
 * @param {number} ease
 */
MG.Utils.ease(value, target, ease);
```

This method changes the given `position` to the `target` position with the given easing factor (`ease`).

```js
/**
 * @param {SAT.Vector} position
 * @param {SAT.Vector} target
 * @param {number} ease
 */
MG.Utils.easePos(position, target, ease);
```
