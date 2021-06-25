/**
 * @description Basic shape Line
 */
class Line {
  /**
   * @param {number} outlineWidth - optional
   * @param {string} outlineColor - with `outlineWidth` only
   */
  constructor(outlineWidth, outlineColor) {
    this.outlineWidth = outlineWidth;
    this.outlineColor = outlineColor;
    this.x0 = 0;
    this.y0 = 0;
    this.x1 = 0;
    this.y1 = 0;
  }

  // -------------------------------------------------------------
  // | Methods
  // -------------------------------------------------------------

  /**
   * @param {object} viewbox
   */
  render(viewbox) {
    if (this.outlineWidth) {
      viewbox.context.save();
      viewbox.context.beginPath();
      viewbox.context.moveTo(viewbox.vminToPx(this.x0), viewbox.vminToPx(this.y0));
      viewbox.context.lineTo(viewbox.vminToPx(this.x1), viewbox.vminToPx(this.y1));
      viewbox.context.lineWidth = viewbox.vminToPx(this.outlineWidth);
      viewbox.context.strokeStyle = this.outlineColor;
      viewbox.context.stroke();
      viewbox.context.restore();
    }
  }
}

module.exports = Line;
