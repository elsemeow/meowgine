# Camera

Moves the viewport to the specified coordinates.

## Example

```js
(() => {
  "use strict";

  let surface = {};
  let entity = {};
  let circle = {};
  let camera = {};

  const init = () => {
    surface = new MG.Surface("#surface", 16, 9);
    surface.ctx.imageSmoothingEnabled = false;

    camera = new MG.Camera(surface.pos("mc"));

    camera.u2p(surface);

    entity = new MG.Entity(
      "mc",
      new SAT.Circle(surface.pos("mc"), 5),
      new MG.Particle(),
      new MG.Sprite(),
      {
        controls: {
          up: false,
          down: false,
          left: false,
          right: false,
        },
      }
    );

    entity.u2p(surface);

    circle = new MG.Entity(
      "mc",
      new SAT.Circle(surface.pos("mc"), 20),
      new MG.Particle(),
      new MG.Sprite()
    );

    circle.u2p(surface);

    // Set keys.
    const setMovement = (code, state) => {
      switch (code) {
        case "KeyW":
        case "ArrowUp":
          entity.vars.controls.up = state;
          break;
        case "KeyS":
        case "ArrowDown":
          entity.vars.controls.down = state;
          break;
        case "KeyA":
        case "ArrowLeft":
          entity.vars.controls.left = state;
          break;
        case "KeyD":
        case "ArrowRight":
          entity.vars.controls.right = state;
          break;
      }
    };

    window.onresize = () => {
      resizeThrottling(() => {
        camera.p2u(surface);
        circle.p2u(surface);
        entity.p2u(surface);

        surface.resize();

        camera.p2u(surface);
        circle.u2p(surface);
        entity.u2p(surface);
      }, 500);
    };

    // Add events listners for controls.
    window.addEventListener(
      "keydown",
      (event) => {
        setMovement(event.code, true);
      },
      true
    );

    window.addEventListener(
      "keyup",
      (event) => {
        setMovement(event.code, false);
      },
      true
    );

    loop();
  };

  const loop = (timeStamp) => {
    surface.cls();

    camera.open(surface);

    circle.render(surface, { hasBorder: true });

    entity.render(surface, { hasFill: true });

    camera.render(surface, { hasBorder: true });

    camera.close(surface);

    // Controls section.
    if (entity.vars.controls.left) {
      entity.particle.vx -= 0.05;
    }

    if (entity.vars.controls.right) {
      entity.particle.vx += 0.05;
    }

    if (entity.vars.controls.up) {
      entity.particle.vy -= 0.05;
    }

    if (entity.vars.controls.down) {
      entity.particle.vy += 0.05;
    }

    if (
      !entity.vars.controls.up &&
      !entity.vars.controls.down &&
      !entity.vars.controls.left &&
      !entity.vars.controls.right
    ) {
      entity.particle.speed -= 0.01;

      if (entity.particle.speed < 0.01) {
        entity.particle.speed = 0;
      }
    }

    // Round and clamp speed.
    entity.particle.speed = MG.Utils.roundToPlaces(entity.particle.speed, 2);
    entity.particle.speed = MG.Utils.clamp(entity.particle.speed, 0, 0.5);
    entity.syncPos(surface);

    camera.pinTo(entity.collision.pos, 0.05);

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

## Parameters

```js
/**
 * @param {SAT.Vector} pos
 */
```

- `pos` - camera origin, in `units`.

## Methods

Move the viewport to the camera `pos`.

```js
/**
 * @param {MG.Surface} surface
 */
camera.open(surface);
```

Transformation reset.

```js
/**
 * @param {MG.Surface} surface
 */
camera.close(surface);
```

This method changes camera `pos` to the `target` position with the given easing factor (`ease`).

```js
/**
 * @param {SAT.Vector} target
 * @param {number} ease
 */
camera.pinTo(target, ease);
```

Convert units to pixels after `surface.resize()` method or after a `camera` instance creating.

```js
/**
 * @param {MG.Surface} surface
 */
camera.u2p(surface);
```

Convert pixels to units before `surface.resize()` method.

```js
/**
 * @param {MG.Surface} surface
 */
camera.p2u(surface);
```

Render a `camera` on a `surface`.

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
camera.render(surface, origin);
```
