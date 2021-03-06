var Canvas = require('./Canvas');

var Spinner = function(){};
Spinner.prototype = new Canvas();
Spinner.prototype.constructor = Spinner;
Spinner.prototype.init = function($el, size) {
  // Save the containing element
  this.$container = $el;
  /* Generate the canvases required by the Spinner.
   Note that the size is perceptive, as compensateForHighDPI()
   could change the 'actual' size; */
  var $dotted_canvas = document.createElement('canvas');
  $dotted_canvas.height = size;
  $dotted_canvas.width = size;
  var $fat_seg_canvas = document.createElement('canvas');
  $fat_seg_canvas.height = size;
  $fat_seg_canvas.width = size;
  var $thin_long_seg_canvas = document.createElement('canvas');
  $thin_long_seg_canvas.height = size;
  $thin_long_seg_canvas.width = size;
  var $thin_short_seg_canvas = document.createElement('canvas');
  $thin_short_seg_canvas.height = size;
  $thin_short_seg_canvas.width = size;

  // Get and save the 2d context of each canvas
  this.dotted = $dotted_canvas.getContext("2d");
  this.fat_seg = $fat_seg_canvas.getContext("2d");
  this.thin_long_seg = $thin_long_seg_canvas.getContext("2d");
  this.thin_short_seg = $thin_short_seg_canvas.getContext("2d");
  // Mutate each canvas as necessary for High DPI screens (Retina)
  this.compensateForHighDPI($dotted_canvas);
  this.compensateForHighDPI($fat_seg_canvas);
  this.compensateForHighDPI($thin_long_seg_canvas);
  this.compensateForHighDPI($thin_short_seg_canvas);
  // Store these elements now that they're ready.
  this.$dotted = $dotted_canvas;
  this.$fat_seg = $fat_seg_canvas;
  this.$thin_long_seg = $thin_long_seg_canvas;
  this.$thin_short_seg = $thin_short_seg_canvas;
  // Write the elements to the view
  var frag = document.createDocumentFragment();
  frag.appendChild(this.$dotted);
  frag.appendChild(this.$fat_seg);
  frag.appendChild(this.$thin_long_seg);
  frag.appendChild(this.$thin_short_seg);
  this.$container.appendChild(frag);
};
Spinner.prototype.setAnimationDegrees = function(degrees_array) {
  this.animation_degrees = degrees_array;
};
Spinner.prototype.animate = function(degrees_array) {
  var self = this;
  if (degrees_array) this.setAnimationDegrees(degrees_array);
  if (this.animation_degrees) {
    this.animationInterval = setInterval(self.transform.bind(self), 16.6);
    this.is_animating = true;
  }
};
Spinner.prototype.stopAnimating = function() {
  window.clearInterval(this.animationInterval);
};
Spinner.prototype.strokeSpoke = function(spoke, $spoke, params) {
  var ctx = ($spoke.width/2);
  var cty = ($spoke.height/2);
  var ratio = this.ratio;
  spoke.clearRect(0, 0, $spoke.width, $spoke.height);
  spoke.translate(ctx, cty);
  spoke.rotate(Math.PI / params.rotation_divisor*ratio);
  spoke.translate(-ctx, -cty);
  spoke.beginPath();
  if (params.dotted) spoke.setLineDash([2*ratio,6.6*ratio]);
  spoke.arc(200*ratio,200*ratio,params.radius*ratio,params.start_deg,2*Math.PI);
  spoke.lineWidth = params.width*ratio;
  spoke.strokeStyle = '#ed2435';
  spoke.stroke();
};
Spinner.prototype.transform = function() {
  if (!this.is_in_viewport) return;
  if (this.dotted) {
    var params = {
      radius: 115,
      width: 7,
      rotation_divisor: this.animation_degrees[0],
      dotted: true,
      start_deg: 0
    };
    this.strokeSpoke(this.dotted, this.$dotted, params);
  }
  if (this.fat_seg) {
    var fat_params = {
      radius: 100,
      width: 15,
      rotation_divisor: this.animation_degrees[1],
      start_deg: 180
    };
    this.strokeSpoke(this.fat_seg, this.$fat_seg, fat_params);
  }
  if (this.thin_long_seg) {
    var thin_params = {
      radius: 125,
      width: 5,
      rotation_divisor: this.animation_degrees[2],
      start_deg: 360
    };
    this.strokeSpoke(this.thin_long_seg, this.$thin_long_seg, thin_params);
  }
  if (this.thin_short_seg) {
    var long_params = {
      radius: 100,
      width: 5,
      rotation_divisor: this.animation_degrees[3],
      start_deg: 350
    };
    this.strokeSpoke(this.thin_short_seg, this.$thin_short_seg, long_params);
  }
};

module.exports = Spinner;