class Circle {
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
    this.radius = 0;
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
      viewbox.context.translate(viewbox.vminToPx(this.x), viewbox.vminToPx(this.y));
      viewbox.context.beginPath();
      viewbox.context.arc(0, 0, viewbox.vminToPx(this.radius), 0, 2 * Math.PI);
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

module.exports = Circle;
