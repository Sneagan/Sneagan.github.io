var VisibilityDector = require('./VisibilityDector');

var DrawCircle = function(){};
DrawCircle.prototype = new VisibilityDector();
DrawCircle.prototype.constructor = DrawCircle;
DrawCircle.prototype.init = function($el) {
  this.$el = $el;
  // In here we'll get the canvas dimensions and other
  // characteristics that we'll need to use in drawing
}

module.exports = DrawCircle;