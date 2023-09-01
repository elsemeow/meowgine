class Rect {
  /**
   * @param {string} color - optional
   * @param {number} outlineWidth - optional
   * @param {string} outlineColor - with `outlineWidth` only
   */
  constructor(color, outlineWidth, outlineColor) {
    this.color = color;
    this.outlineWidth = outlineWidth;
    this.outlineColor = outlineColor;
    this.x = 0;
    this.y = 0;
    this.height = 0;
    this.width = 0;
    this.isVisible = true;
  }

  // -------------------------------------------------------------
  // | Methods
  // -------------------------------------------------------------

  /**
   * @param {object} viewbox
   */
  render(viewbox) {
    if (this.isVisible) {
      viewbox.context.save();
      viewbox.context.translate(viewbox.vminToPx(this.x - this.width / 2), viewbox.vminToPx(this.y - this.height / 2));
      viewbox.context.beginPath();
      viewbox.context.rect(0, 0, viewbox.vminToPx(this.width), viewbox.vminToPx(this.height));
      if (this.color) {
        viewbox.context.fillStyle = this.color;
        viewbox.context.fill();
      }
      if (this.outlineWidth) {
        viewbox.context.lineWidth = viewbox.vminToPx(this.outlineWidth);
        viewbox.context.strokeStyle = this.outlineColor;
        viewbox.context.stroke();
      }
      viewbox.context.restore();
    }
  }
}

module.exports = Rect;
