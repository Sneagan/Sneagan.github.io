(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./VisibilityDetector":4}],2:[function(require,module,exports){
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
},{"./Canvas":1}],3:[function(require,module,exports){
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
},{"./Canvas":1}],4:[function(require,module,exports){
var VisibilityDetector = function(){};
VisibilityDetector.prototype.fireIfVisible = function(callback) {
  var self = this;
  return (function () {
    if (self.isFullyInViewport() || self.isPartiallyInViewport()) {
      if (!self.is_in_viewport) {
        // Only trigger the callback once.
        self.is_in_viewport = true;
        callback();
      }
    } else {
      self.is_in_viewport = false;
      if (self.is_animating) self.stopAnimating();
    }
  })();
};
VisibilityDetector.prototype.isFullyInViewport = function($el) {
  var rect = this.$container.getBoundingClientRect();
  return (
    !this.isHidden(this.$container) &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && // $(window).height()
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) // $(window).width()
  );
};
VisibilityDetector.prototype.isPartiallyInViewport = function($el) {
  var rect = this.$container.getBoundingClientRect();
  return (
    !this.isHidden(this.$container) &&
    rect.top + this.$container.offsetHeight >= 0 &&
    rect.left >= 0 &&
    rect.bottom - this.$container.offsetHeight <= (window.innerHeight || document.documentElement.clientHeight) && // $(window).height()
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) // $(window).width()
  );
};
VisibilityDetector.prototype.isHidden = function($el) {
  return ($el.offsetParent === null);
};

module.exports = VisibilityDetector;
},{}],5:[function(require,module,exports){
var Spinner = require('../constructors/Spinner');
var Divider = require('../constructors/Divider');

var WatchForMe = [];

function animationHandler() {
  for (var i = 0; i < WatchForMe.length; i++) {
    var currentAnimation = WatchForMe[i];
    currentAnimation.fireIfVisible(currentAnimation.animate.bind(currentAnimation));
  }
}

window.onload = function() {
  console.log('starting');
  var spinner_1 = new Spinner();
  var spinner_2 = new Spinner();

  spinner_1.init(document.getElementsByClassName('spinner')[0], 400);
  spinner_2.init(document.getElementsByClassName('spinner')[1], 400);
  spinner_1.setAnimationDegrees([720, -360, 360, 360]);
  spinner_2.setAnimationDegrees([-720, 360, -360, -720]);
  
  WatchForMe.push(spinner_1);
  WatchForMe.push(spinner_2);

  var dividers = document.getElementsByClassName('animated-divider');
  for (var i = 0; i < dividers.length; i++) {
    var divider = new Divider();
    divider.init(dividers[i]);
  }
  animationHandler();
};

window.onscroll = function() {
  animationHandler();
};
},{"../constructors/Divider":2,"../constructors/Spinner":3}]},{},[5]);