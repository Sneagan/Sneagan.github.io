var VisibilityDector = require('./VisibilityDetector');

var Divider = function(){};
Divider.prototype = new VisibilityDector();
Divider.prototype.constructor = Divider;
Divider.prototype.init = function($el) {
  this.$el = $el;
  // In here we'll get the canvas dimensions and other
  // characteristics that we'll need to use in drawing
};

module.exports = Divider;