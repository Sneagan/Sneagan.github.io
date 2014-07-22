var VisibilityDector = require('./VisibilityDetector');

var DrawLine = function(){};
DrawLine.prototype = new VisibilityDector();
DrawLine.prototype.constructor = DrawLine;
DrawLine.prototype.init = function($el) {
  this.$el = $el;
  // In here we'll get the canvas dimensions and other
  // characteristics that we'll need to use in drawing
};

module.exports = DrawLine;