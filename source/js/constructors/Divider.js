var VisibilityDector = require('./VisibilityDetector');

var Divider = function(){};
Divider.prototype = new VisibilityDector();
Divider.prototype.constructor = Divider;
Divider.prototype.init = function($el) {
  this.$container = $el;
  /* Generate the canvases required by the Spinner.
   Note that the size is perceptive, as compensateForHighDPI()
   could change the 'actual' size; */
  this.$thin_top_canvas = document.createElement('canvas');
  this.$thin_top_canvas.height = 50;
  this.$thin_top_canvas.width = 150;
  
  this.$dotted_canvas = document.createElement('canvas');
  this.$dotted_canvas.height = 50;
  this.$dotted_canvas.width = 150;

  this.$thin_bottom_canvas = document.createElement('canvas');
  this.$thin_bottom_canvas.height = 50;
  this.$thin_bottom_canvas.width = 150;


  var frag = document.createDocumentFragment();
  frag.appendChild(this.$thin_top_canvas);
  frag.appendChild(this.$dotted_canvas);
  frag.appendChild(this.$thin_bottom_canvas);
  this.$container.appendChild(frag);
};

module.exports = Divider;