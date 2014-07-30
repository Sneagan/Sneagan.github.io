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
},{"./VisibilityDetector":5}],2:[function(require,module,exports){
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
},{"./Canvas":1}],3:[function(require,module,exports){
var VisibilityDetector = require('./VisibilityDetector');

var NavigationHighlighter = function(){};
NavigationHighlighter.prototype = new VisibilityDetector();
NavigationHighlighter.prototype.constructor = NavigationHighlighter;
NavigationHighlighter.prototype.init = function($el, $button) {
  this.$container = $el;
  this.$button = $button;
  this.$all_buttons = this.getSiblings($button);
  this.$all_buttons.push($button);
};
NavigationHighlighter.prototype.getChildren = function(n, skipMe) {
  var r = [];
  var elem = null;
  for ( ; n; n = n.nextSibling ) 
    if ( n.nodeType == 1 && n != skipMe) r.push( n );        
  return r;
};
NavigationHighlighter.prototype.getSiblings = function(n) {
  return this.getChildren(n.parentNode.firstChild, n);
};
NavigationHighlighter.prototype.highlightNavButton = function() {
  for (var i = 0; i < this.$all_buttons.length; i++) {
    this.$all_buttons[i].classList.remove('active');
  }
  this.$button.classList.add('active');
};

module.exports = NavigationHighlighter;
},{"./VisibilityDetector":5}],4:[function(require,module,exports){
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
},{"./Canvas":1}],5:[function(require,module,exports){
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

VisibilityDetector.prototype.fireIfFullyVisible = function(callback) {
  var self = this;
  console.log('running');
  return (function () {
    if (self.isFullyInViewport()) {
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
},{}],6:[function(require,module,exports){
var Spinner = require('../constructors/Spinner');
var Divider = require('../constructors/Divider');
var NavigationHighlighter = require('../constructors/NavigationHighlighter');

var WatchForMe = [];
var NavHighlighters = [];

function animationHandler() {
  for (var i = 0; i < WatchForMe.length; i++) {
    var currentAnimation = WatchForMe[i];
    currentAnimation.fireIfVisible(currentAnimation.animate.bind(currentAnimation));
  }
  for (var n = 0; n < NavHighlighters.length; n++) {
    var currentNav = NavHighlighters[n];
    currentNav.fireIfFullyVisible(currentNav.highlightNavButton.bind(currentNav));
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
    WatchForMe.push(divider);
  }
  animationHandler();

  var aboutNavHighlighter = new NavigationHighlighter();
  aboutNavHighlighter.init(document.getElementById('about'), document.getElementsByClassName('navigation')[0]);
  var signupNavHighlighter = new NavigationHighlighter();
  signupNavHighlighter.init(document.getElementById('sign-up'), document.getElementsByClassName('navigation')[1]);
  var partnersNavHighlighter = new NavigationHighlighter();
  partnersNavHighlighter.init(document.getElementById('partners'), document.getElementsByClassName('navigation')[2]);
  var vehiclesNavHighlighter = new NavigationHighlighter();
  vehiclesNavHighlighter.init(document.getElementById('test-vehicles'), document.getElementsByClassName('navigation')[3]);
  NavHighlighters = [aboutNavHighlighter, signupNavHighlighter, partnersNavHighlighter, vehiclesNavHighlighter];

  var hero1 = document.getElementsByClassName('hero-one')[0];
  var hero2 = document.getElementsByClassName('hero-two')[0];
  var heroTimer = setInterval(function() {
    hero1.classList.toggle('active');
    hero2.classList.toggle('active');
  }, 10000);

  document.getElementsByClassName('spinner-container')[0].onmouseover = function() {
    document.getElementsByClassName('hover-details')[0].classList.add('active');
  };
  document.getElementsByClassName('spinner-container')[0].onmouseout = function() {
    document.getElementsByClassName('hover-details')[0].classList.remove('active');
  };
  document.getElementsByClassName('spinner-container')[1].onmouseover = function() {
    document.getElementsByClassName('hover-details')[1].classList.add('active');
  };
  document.getElementsByClassName('spinner-container')[1].onmouseout = function() {
    document.getElementsByClassName('hover-details')[1].classList.remove('active');
  };

};

window.onscroll = function() {
  animationHandler();
};
},{"../constructors/Divider":2,"../constructors/NavigationHighlighter":3,"../constructors/Spinner":4}]},{},[6]);