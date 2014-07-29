var Canvas = require('./Canvas');

var Divider = function(){};
Divider.prototype = new Canvas();
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

  // Get and save the 2d context of each canvas
  this.thin_top = this.$thin_top_canvas.getContext("2d");
  this.dotted = this.$dotted_canvas.getContext("2d");
  this.thin_bottom = this.$thin_bottom_canvas.getContext("2d");

  // Mutate each canvas as necessary for High DPI screens (Retina)
  this.compensateForHighDPI(this.$thin_top_canvas);
  this.compensateForHighDPI(this.$dotted_canvas);
  this.compensateForHighDPI(this.$thin_bottom_canvas);

  var frag = document.createDocumentFragment();
  frag.appendChild(this.$thin_top_canvas);
  frag.appendChild(this.$dotted_canvas);
  frag.appendChild(this.$thin_bottom_canvas);
  this.$container.appendChild(frag);

  this.draw();
};
Divider.prototype.draw = function() {
  this.thin_top.moveTo(0, 5);
  this.thin_top.lineTo(150, 5);
  this.thin_top.lineWidth = 2;
  this.thin_top.strokeStyle = '#ed2435';
  this.thin_top.stroke();

  this.dotted.moveTo(0, 25);
  this.dotted.lineTo(150, 25);
  this.dotted.lineWidth = 5;
  this.dotted.setLineDash([20,5]);
  this.dotted.strokeStyle = '#ed2435';
  this.dotted.stroke();

  this.thin_bottom.moveTo(0, 45);
  this.thin_bottom.lineTo(150, 45);
  this.thin_bottom.lineWidth = 2;
  this.thin_bottom.strokeStyle = '#ed2435';
  this.thin_bottom.stroke();
};

module.exports = Divider;