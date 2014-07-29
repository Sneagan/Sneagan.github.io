var VisibilityDector = require('./VisibilityDetector');

var Canvas = function(){};
Canvas.prototype = new VisibilityDector();
Canvas.prototype.constructor = Canvas;
Canvas.prototype.compensateForHighDPI = function($el) {
  if (!this.ratio) {
    var dpr = window.devicePixelRatio || 1;
    var backingStoreRatio = $el.webkitBackingStorePixelRatio ||
                            $el.mozBackingStorePixelRatio ||
                            $el.msBackingStorePixelRatio ||
                            $el.oBackingStorePixelRatio ||
                            $el.backingStorePixelRatio || 1;
    var ratio = dpr/backingStoreRatio;
    this.ratio = ratio;
  }
  var oldWidth = $el.width;
  var oldHeight = $el.height;
  $el.width = oldWidth * this.ratio;
  $el.height = oldHeight * this.ratio;
  $el.style.width = oldWidth + 'px';
  $el.style.height = oldHeight + 'px';
};

module.exports = Canvas;