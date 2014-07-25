(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var VisibilityDector = require('./VisibilityDetector');

var DrawCircle = function(){};
DrawCircle.prototype = new VisibilityDector();
DrawCircle.prototype.constructor = DrawCircle;
DrawCircle.prototype.init = function($elems) {
  this.dotted = $elems[0].getContext("2d");
  this.fat_seg = $elems[1].getContext("2d");
  this.thin_long_seg = $elems[2].getContext("2d");
  this.thin_short_seg = $elems[3].getContext("2d");

  this.$dotted = $elems[0];
  this.$fat_seg = $elems[1];
  this.$thin_long_seg = $elems[2];
  this.$thin_short_seg = $elems[3];

  var dpr = window.devicePixelRatio || 1;
  var backingStoreRatio = $elems[0].webkitBackingStorePixelRatio ||
                          $elems[0].mozBackingStorePixelRatio ||
                          $elems[0].msBackingStorePixelRatio ||
                          $elems[0].oBackingStorePixelRatio ||
                          $elems[0].backingStorePixelRatio || 1;
  var ratio = dpr/backingStoreRatio;
  this.ratio = ratio;

  for (var i = 0; i < $elems.length; i++) {
    var oldWidth = $elems[i].width;
    var oldHeight = $elems[i].height;
    $elems[i].width = oldWidth * ratio;
    $elems[i].height = oldHeight * ratio;
    $elems[i].style.width = oldWidth + 'px';
    $elems[i].style.height = oldHeight + 'px';
  }
};
DrawCircle.prototype.animate = function(deg1, deg2, deg3, deg4) {
  var ratio = this.ratio;
  if (this.dotted) {
    var dotted = this.dotted;
    var $dotted = this.$dotted;
    var ctx1 = ($dotted.width/2);
    var cty1 = ($dotted.height/2);

    dotted.clearRect(0, 0, $dotted.width, $dotted.height);
    dotted.translate(ctx1, cty1);
    dotted.rotate(Math.PI / deg1*ratio);
    dotted.translate(-ctx1, -cty1);
    dotted.beginPath();
    dotted.setLineDash([2*ratio,6.6*ratio]);
    dotted.arc(200*ratio,200*ratio,115*ratio,0,2*Math.PI);
    dotted.lineWidth = 7*ratio;
    dotted.strokeStyle = '#ed2435';
    dotted.stroke();
  }
  if (this.fat_seg) {
    var fat_seg = this.fat_seg;
    var $fat_seg = this.$fat_seg;
    var ctx2 = ($fat_seg.width/2);
    var cty2 = ($fat_seg.height/2);

    fat_seg.clearRect(0, 0, $fat_seg.width, $fat_seg.height);
    fat_seg.translate(ctx2, cty2);
    fat_seg.rotate(Math.PI / deg2*ratio);
    fat_seg.translate(-ctx2, -cty2);
    fat_seg.beginPath();
    fat_seg.arc(200*ratio,200*ratio,100*ratio,180,2*Math.PI);
    fat_seg.lineWidth = 15*ratio;
    fat_seg.strokeStyle = '#ed2435';
    fat_seg.stroke();
  }

  if (this.thin_long_seg) {
    var thin_long_seg = this.thin_long_seg;
    var $thin_long_seg = this.$thin_long_seg;
    var ctx3 = ($thin_long_seg.width/2);
    var cty3 = ($thin_long_seg.height/2);

    thin_long_seg.clearRect(0, 0, $thin_long_seg.width, $thin_long_seg.height);
    thin_long_seg.translate(ctx3, cty3);
    thin_long_seg.rotate(Math.PI / deg3*ratio);
    thin_long_seg.translate(-ctx3, -cty3);
    thin_long_seg.beginPath();
    thin_long_seg.arc(200*ratio,200*ratio,125*ratio,360,2*Math.PI);
    thin_long_seg.lineWidth = 5*ratio;
    thin_long_seg.strokeStyle = '#ed2435';
    thin_long_seg.stroke();
  }

  if (this.thin_short_seg) {
    var thin_short_seg = this.thin_short_seg;
    var $thin_short_seg = this.$thin_short_seg;
    var ctx4 = ($thin_short_seg.width/2);
    var cty4 = ($thin_short_seg.height/2);

    thin_short_seg.clearRect(0, 0, $thin_short_seg.width, $thin_short_seg.height);
    thin_short_seg.translate(ctx4, cty4);
    thin_short_seg.rotate(Math.PI / deg4*ratio);
    thin_short_seg.translate(-ctx4, -cty4);
    thin_short_seg.beginPath();
    thin_short_seg.arc(200*ratio,200*ratio,100*ratio,350,2*Math.PI);
    thin_short_seg.lineWidth = 5*ratio;
    thin_short_seg.strokeStyle = '#ed2435';
    thin_short_seg.stroke();
  }
};

module.exports = DrawCircle;
},{"./VisibilityDetector":2}],2:[function(require,module,exports){
var VisibilityDetector = function(){};
VisibilityDetector.prototype.fireIfVisible = function(callback) {
  var self = this;
  return (function () {
    if (self.isInViewport()) {
      if (!self.iteration_began) {
        // Only trigger the callback once.
        self.iteration_began = true;
        callback();
      }
    } else {
      self.iteration_began = false;
    }
  })();
};
VisibilityDetector.prototype.isInViewport = function() {
  var rect = this.elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* $(window).width() */
  );
};
VisibilityDetector.prototype.isHidden = function(el) {
  return (el.offsetParent === null);
};

module.exports = VisibilityDetector;
},{}],3:[function(require,module,exports){
var DrawCircle = require('../constructors/DrawCircle');

window.onload = function() {
  console.log('starting');
  var circle_1 = new DrawCircle();
  var circle_2 = new DrawCircle();

  circle_1.init([
    document.getElementById('circle-canvas-1'),
    document.getElementById('circle-canvas-2'),
    document.getElementById('circle-canvas-3'),
    document.getElementById('circle-canvas-4')
  ]);
  circle_2.init([
    document.getElementById('circle-canvas-5'),
    document.getElementById('circle-canvas-6'),
    document.getElementById('circle-canvas-7'),
    document.getElementById('circle-canvas-8')
  ]);

  setInterval(circle_1.animate.bind(circle_1, 720, -360, 360, 360), 5);
  setInterval(circle_2.animate.bind(circle_2, -720, 360, -360, -720), 5);
};
},{"../constructors/DrawCircle":1}]},{},[3]);