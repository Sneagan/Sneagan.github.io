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
  this.$dotted_canvas.width = 110;
  this.$thin_bottom_canvas = document.createElement('canvas');
  this.$thin_bottom_canvas.height = 50;
  this.$thin_bottom_canvas.width = 150;
  this.$dot_1_canvas = document.createElement('canvas');
  this.$dot_1_canvas.height = 50;
  this.$dot_1_canvas.width = 150;
  this.$dot_2_canvas = document.createElement('canvas');
  this.$dot_2_canvas.height = 50;
  this.$dot_2_canvas.width = 150;
  this.$dot_3_canvas = document.createElement('canvas');
  this.$dot_3_canvas.height = 50;
  this.$dot_3_canvas.width = 150;
  this.$dot_4_canvas = document.createElement('canvas');
  this.$dot_4_canvas.height = 50;
  this.$dot_4_canvas.width = 150;
  this.$dot_5_canvas = document.createElement('canvas');
  this.$dot_5_canvas.height = 50;
  this.$dot_5_canvas.width = 150;

  // Get and save the 2d context of each canvas
  this.thin_top = this.$thin_top_canvas.getContext("2d");
  this.dotted = this.$dotted_canvas.getContext("2d");
  this.thin_bottom = this.$thin_bottom_canvas.getContext("2d");
  this.dot_1 = this.$dot_1_canvas.getContext("2d");
  this.dot_2 = this.$dot_2_canvas.getContext("2d");
  this.dot_3 = this.$dot_3_canvas.getContext("2d");
  this.dot_4 = this.$dot_4_canvas.getContext("2d");
  this.dot_5 = this.$dot_5_canvas.getContext("2d");

  // Mutate each canvas as necessary for High DPI screens (Retina)
  this.compensateForHighDPI(this.$thin_top_canvas);
  this.compensateForHighDPI(this.$dotted_canvas);
  this.compensateForHighDPI(this.$thin_bottom_canvas);
  this.compensateForHighDPI(this.$dot_1_canvas);
  this.compensateForHighDPI(this.$dot_2_canvas);
  this.compensateForHighDPI(this.$dot_3_canvas);
  this.compensateForHighDPI(this.$dot_4_canvas);
  this.compensateForHighDPI(this.$dot_5_canvas);

  var frag = document.createDocumentFragment();
  frag.appendChild(this.$thin_top_canvas);
  frag.appendChild(this.$dotted_canvas);
  frag.appendChild(this.$thin_bottom_canvas);
  frag.appendChild(this.$dot_1_canvas);
  frag.appendChild(this.$dot_2_canvas);
  frag.appendChild(this.$dot_3_canvas);
  frag.appendChild(this.$dot_4_canvas);
  frag.appendChild(this.$dot_5_canvas);
  this.$container.appendChild(frag);

  this.draw();
};
Divider.prototype.draw = function() {
  var ratio = this.ratio;
  this.thin_top.moveTo(0*ratio, 5*ratio);
  this.thin_top.lineTo(100*ratio, 5*ratio);
  this.thin_top.lineWidth = 2*ratio;
  this.thin_top.strokeStyle = '#ed2435';
  this.thin_top.stroke();

  this.dotted.moveTo(0*ratio, 25*ratio);
  this.dotted.lineTo(150*ratio, 25*ratio);
  this.dotted.lineWidth = 5*ratio;
  this.dotted.strokeStyle = '#ed2435';
  this.dotted.stroke();

  this.dot_1.moveTo(30*ratio, 20*ratio);
  this.dot_1.lineTo(15*ratio, 30*ratio);
  this.dot_1.lineWidth = 5*ratio;
  this.dot_1.strokeStyle = '#ffffff';
  this.dot_1.stroke();
  this.dot_2.moveTo(60*ratio, 20*ratio);
  this.dot_2.lineTo(45*ratio, 30*ratio);
  this.dot_2.lineWidth = 5*ratio;
  this.dot_2.strokeStyle = '#ffffff';
  this.dot_2.stroke();
  this.dot_3.moveTo(90*ratio, 20*ratio);
  this.dot_3.lineTo(75*ratio, 30*ratio);
  this.dot_3.lineWidth = 5*ratio;
  this.dot_3.strokeStyle = '#ffffff';
  this.dot_3.stroke();
  this.dot_4.moveTo(120*ratio, 20*ratio);
  this.dot_4.lineTo(100*ratio, 30*ratio);
  this.dot_4.lineWidth = 5*ratio;
  this.dot_4.strokeStyle = '#ffffff';
  this.dot_4.stroke();
  this.dot_5.moveTo(150*ratio, 20*ratio);
  this.dot_5.lineTo(130*ratio, 30*ratio);
  this.dot_5.lineWidth = 5*ratio;
  this.dot_5.strokeStyle = '#ffffff';
  this.dot_5.stroke();

  this.thin_bottom.moveTo(150*ratio, 45*ratio);
  this.thin_bottom.lineTo(50*ratio, 45*ratio);
  this.thin_bottom.lineWidth = 2*ratio;
  this.thin_bottom.strokeStyle = '#ed2435';
  this.thin_bottom.stroke();
  this.temp_x = 150;
};
Divider.prototype.transform = function() {
  
};
Divider.prototype.animate = function(degrees_array) {
  var self = this;
  this.animationInterval = setInterval(self.transform.bind(self), 16.6);
  this.is_animating = true;
};
Divider.prototype.stopAnimating = function() {
  window.clearInterval(this.animationInterval);
};

module.exports = Divider;