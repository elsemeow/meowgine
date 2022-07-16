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

```js
/**
 * @param {number} value
 * @param {number} places
 */
MG.Utils.roundToPlaces(value, places);
```

```js
/**
 * @param {number} value
 * @param {string} units - Possible values: "vmin", "vmax".
 * @param {MG.Surface} surface
 */
MG.Utils.u2p(value, surface);
```

```js
/**
 * @param {number} value
 * @param {string} units - Possible values: "vmin", "vmax".
 * @param {MG.Surface} surface
 */
MG.Utils.p2u(value, surface);
```

```js
/**
 * @param {SAT.Vector} pos
 * @param {number} r
 */
MG.Utils.circleToPath(pos, r);
```

```js
/**
 * @param {SAT.Vector} pos
 * @param {SAT.Vector[]} points
 */
MG.Utils.polygonToPath(pos, points);
```

```js
/**
 * @param {SAT.Vector} pos
 * @param {number} w
 * @param {number} h
 */
MG.Utils.boxToPath(pos, w, h);
```

## Animations

```js
/**
 * @param {Object} value
 * @param {Object} target
 * @param {number} ease
 */
MG.Utils.ease(value, target, ease);
```

```js
/**
 * @param {SAT.Vector} position
 * @param {SAT.Vector} target
 * @param {number} ease
 */
MG.Utils.easePos(position, target, ease);
```
