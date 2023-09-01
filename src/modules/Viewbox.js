/**
 * @description Viewbox with setted properties
 */
class Viewbox {
  /**
   * @param {string} element
   * @param {string} container
   * @param {number} aspectRatioWidth - optional (use for 'aspect' mode only)
   * @param {number} aspectRatioHeight - optional (use for 'aspect' mode only)
   */
  constructor(element, container, aspectRatioWidth, aspectRatioHeight) {
    this.element = document.querySelector(element);
    this.container = document.querySelector(container);
    this.aspectRatioWidth = aspectRatioWidth || 1;
    this.aspectRatioHeight = aspectRatioHeight || 1;
  }

  // -------------------------------------------------------------
  // | Getters
  // -------------------------------------------------------------

  get context() {
    return this.element.getContext('2d');
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }

  get x0() {
    return this.element.offsetLeft;
  }

  get y0() {
    return this.element.offsetTop;
  }

  get containerWidth() {
    return this.container.offsetWidth;
  }

  get containerHeight() {
    return this.container.offsetHeight;
  }

  // -------------------------------------------------------------
  // | Setters
  // -------------------------------------------------------------

  set width(width) {
    this.element.width = width;
  }

  set height(height) {
    this.element.height = height;
  }

  // -------------------------------------------------------------
  // | Methods
  // -------------------------------------------------------------

  /**
   * @description Clears canvas
   */
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * @param {string} mode - by aspect ratio or by size of container
   */
  resize(mode) {
    switch (mode) {
      case 'aspect': {
        this._resizeByAspect();
        break;
      }
      case 'size': {
        this.width = this.containerWidth;
        this.height = this.containerHeight;
        break;
      }
      default: {
        this._resizeByAspect();
        break;
      }
    }
  }

  /**
   * @description Private method for canvas size calculation by aspect ratio
   */
  _resizeByAspect() {
    if (this.aspectRatioWidth > this.aspectRatioHeight) {
      this.width = this.containerWidth;
      this.height = (this.containerWidth * this.aspectRatioHeight) / this.aspectRatioWidth;
    } else {
      this.width = (this.containerWidth * this.aspectRatioWidth) / this.aspectRatioHeight;
      this.height = this.containerWidth;
    }
  }

  /**
   * @param {number} vw
   */
  vwToPx(vw) {
    return mg.Utilities.map(vw, 0, 100, 0, this.width);
  }

  /**
   * @param {number} vh
   */
  vhToPx(vh) {
    return mg.Utilities.map(vh, 0, 100, 0, this.height);
  }

  /**
   * @param {number} vmin
   */
  vminToPx(vmin) {
    return mg.Utilities.map(vmin, 0, 100, 0, Math.min(this.width, this.height));
  }

  /**
   * @param {number} vmax
   */
  vmaxToPx(vmax) {
    return mg.Utilities.map(vmax, 0, 100, 0, Math.max(this.width, this.height));
  }

  /**
   * @param {number} px
   */
  pxToVw(px) {
    return mg.Utilities.map(px, 0, this.width, 0, 100);
  }

  /**
   * @param {number} px
   */
  pxToVh(px) {
    return mg.Utilities.map(px, 0, this.height, 0, 100);
  }

  /**
   * @param {number} px
   */
  pxToVmin(px) {
    return mg.Utilities.map(px, 0, Math.min(this.width, this.height), 0, 100);
  }

  /**
   * @param {number} px
   */
  pxToVmax(px) {
    return mg.Utilities.map(px, 0, Math.max(this.width, this.height), 0, 100);
  }

  /**
   * @param {boolean} value
   * @description Disable image smoothing for better rendering of `mg.Sprite`
   */
  enableImageSmoothing(value) {
    this.context.imageSmoothingEnabled = value;
  }
}

module.exports = Viewbox;
