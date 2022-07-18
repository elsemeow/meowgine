# Surface

A canvas element whose size is determined by its aspect ratio.

The minimum computed width and height of the surface is `300` pixels, and the maximum is `8192` pixels.

## Example

### Step 1

Create an HTML canvas element with the desired id.

```html
<canvas id="surface"></canvas>
```

### Step 2

Add some CSS styles to our example.

```css
body {
  background: #fff;
  margin: 0;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

canvas {
  background: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
```

### Step 3

Create a surface based on canvas element with id "surface", aspect ratio 16:9 and scaling objects on it in "vmax" units.

Then we specify that when the window is resized, our surface dimensions will be recalculated with a delay of 0.5 seconds and the surface context will be cleared every frame.

```js
(() => {
  "use strict";

  let surface = {};

  const init = () => {
    surface = new MG.Surface("#surface", 16, 9, "vmax");

    // Turn off image smoothing if necessary.
    surface.ctx.imageSmoothingEnabled = false;

    window.onresize = () => {
      resizeThrottling(() => {
        surface.resize();
      }, 500);
    };

    // Run game loop.
    loop();
  };

  const loop = (timeStamp) => {
    // Clear surface.
    surface.cls();

    // Callback game loop.
    window.requestAnimationFrame(loop);
  };

  /** Resize event throttling function. */
  const resizeThrottling = (() => {
    let alarm = 0;
    return (f, ms) => {
      clearTimeout(alarm);
      alarm = setTimeout(f, ms);
    };
  })();

  // Run code on page load.
  window.onload = () => {
    init();
  };
})();
```

Excellent! Surface created! 🥳

## Parameters

```js
/**
 * @param {string} selector
 * @param {number} viewWport
 * @param {number} viewHport
 * @param {string} [units]
 */
```

- `selector` - to select surface canvas element;
- `viewWport`, `viewHport` - width to height ratio;
- `units` - relative to 1% smaller (`"vmin"`) or larger (`"vmax"`) dimension of the surface. Optional, default is `"vmin"`.

## Getters

Get the `surface` canvas element.

```js
surface.el;
```

Get the `surface` canvas context.

```js
surface.ctx;
```

Get the `surface` width in pixels.

```js
surface.w;
```

Get the `surface` height in pixels.

```js
surface.h;
```

## Methods

This method clears the surface canvas context.

```js
surface.cls();
```

This method returns a `SAT.Vector` with the position of the selected point on the surface in units.

Possible values:

- `tl` - top left;
- `tc` - top center;
- `tr` - top right;
- `ml` - middle left;
- `mc` - middle center;
- `mr` - middle right;
- `bl` - bottom left;
- `bc` - bottom center;
- `br` - bottom right.

```js
/**
 * (tl)-----(tc)-----(tr)
 *  |                  |
 *  |                  |
 * (ml)     (mc)     (mr)
 *  |                  |
 *  |                  |
 * (bl)-----(bc)-----(br)
 */

surface.pos("mc");
```
