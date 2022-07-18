# Background

Background image of a surface.

## Example

```js
(() => {
  "use strict";

  let surface = {};
  let background = {};

  const init = () => {
    surface = new MG.Surface("#surface", 16, 9);
    surface.ctx.imageSmoothingEnabled = false;

    background = new MG.Background({
      src: `${BACKGROUND_PATH}`,
      sW: 1920,
      sH: 1200,
      pos: surface.pos("mc"),
      dW: 192,
      dH: 120,
    });

    background.u2p(surface);

    window.onresize = () => {
      resizeThrottling(() => {
        background.p2u(surface);

        surface.resize();

        background.u2p(surface);
      }, 500);
    };

    loop();
  };

  const loop = (timeStamp) => {
    surface.cls();

    background.render(surface, { hasBorder: true });

    window.requestAnimationFrame(loop);
  };

  const resizeThrottling = (() => {
    let alarm = 0;
    return (f, ms) => {
      clearTimeout(alarm);
      alarm = setTimeout(f, ms);
    };
  })();

  window.onload = () => {
    init();
  };
})();
```

## Parameters

```js
/**
 * @param {Object} [options]
 * @param {Image} [options.img]
 * @param {string} [options.src]
 * @param {number} [options.sW]
 * @param {number} [options.sH]
 * @param {SAT.Vector} [options.pos]
 * @param {number} [options.dW]
 * @param {number} [options.dH]
 */
```

- `img` - instance of image (e.g. image from another instance of background);
- `src` - path to image (background), unnecessary if `img` passed;
- `sW` - source image width, in `px`;
- `sH` - source image height, in `px`;
- `pos` - origin (middle center of image) position, in `units`;
- `dW` - scaled image width, in `units`;
- `dH` - scaled image width, in `units`.

## Methods

This method changes background `pos` to the `target` position with the given easing factor (`ease`).

```js
/**
 * @param {SAT.Vector} target
 * @param {number} ease
 */
background.pinTo(target, ease);
```

Convert units to pixels after `surface.resize()` method or after a `background` instance creating.

```js
/**
 * @param {MG.Surface} surface
 */
background.u2p(surface);
```

Convert pixels to units before `surface.resize()` method.

```js
/**
 * @param {MG.Surface} surface
 */
background.p2u(surface);
```

Render a `background` on a `surface`.

This method can take optional parameter to display the stylized origin (useful for debugging).

```js
/**
 * @param {MG.Surface} surface
 * @param {Object} [origin]
 * @param {boolean} [origin.hasBorder]
 * @param {string} [origin.borderWidth]
 * @param {string} [origin.borderColor]
 * @param {number} [origin.r]
 */
background.render(surface, origin);
```
