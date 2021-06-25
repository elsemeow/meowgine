/**
 * @description Two-dimensional bitmap without spaces between frames and offsets.
 * Stripes should be placed horizontally only, e.g. from `| 1, 1 |` to `| 1, 2 |`.
 * ```
 * | 0, 0 | 0, 1 | 0, 2 |
 * | 1, 0 | 1, 1 | 1, 2 |
 * | 2, 0 | 2, 1 | 2, 2 |
 * ```
 */
class Sprite {
  /**
   * @param {string} src - image path
   * @param {number} size - width and height of single frame
   * @param {number} speed - seconds per frame
   * @param {number} row - start strip from row
   * @param {number} col - start strip from column
   * @param {number} frames - number of frames
   */
  constructor(src, size, speed, row, col, frames) {
    this._image = new Image();
    this._image.src = src;
    this.size = size;
    this.speed = speed;
    this.row = row;
    this.col = col;
    this.frames = frames;
    this.x = 0;
    this.y = 0;
    this.scale = 0;
    this.isPlaying = true;
    this.currentCol = col;
    this._now = 0;
  }

  // -------------------------------------------------------------
  // | Methods
  // -------------------------------------------------------------

  /**
   * @param {object} viewbox
   */
  render(viewbox) {
    if (this._image.complete && this._image.naturalHeight !== 0) {
      if (Date.now() - this._now >= this.speed * 1000 && this.isPlaying) {
        this.currentCol += 1;
        if (this.currentCol >= this.col + this.frames) {
          this.currentCol = this.col;
        }
        this._now = Date.now();
      }

      viewbox.context.save();
      viewbox.context.translate(viewbox.vminToPx(this.x - this.scale / 2), viewbox.vminToPx(this.y - this.scale / 2));
      viewbox.context.beginPath();
      viewbox.context.drawImage(
        this._image,
        this.currentCol * this.size,
        this.row * this.size,
        this.size,
        this.size,
        0,
        0,
        viewbox.vminToPx(this.scale),
        viewbox.vminToPx(this.scale),
      );
      viewbox.context.restore();
    }
  }
}

module.exports = Sprite;
