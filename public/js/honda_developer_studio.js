(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var VisibilityDector = require('./VisibilityDetector');

var DrawCircle = function(){};
DrawCircle.prototype = new VisibilityDector();
DrawCircle.prototype.constructor = DrawCircle;
DrawCircle.prototype.init = function($el1, $el2, $el3, $el4) {
  this.dotted = $el1.getContext("2d");
  this.fat_seg = $el2.getContext("2d");
  this.thin_long_seg = $el3.getContext("2d");
  this.thin_short_seg = $el4.getContext("2d");
};
DrawCircle.prototype.animate = function() {
  if (this.dotted) {
    this.dotted.clearRect(0, 0, 400, 400);
    this.dotted.translate(200/2, 200/2);
    this.dotted.rotate(Math.PI / 720);
    this.dotted.translate(-200/2, -200/2);
    this.dotted.beginPath();
    this.dotted.setLineDash([2,10]);
    this.dotted.arc(100,100,40,0,2*Math.PI);
    this.dotted.lineWidth = 10;
    this.dotted.stroke();
  }
  if (this.fat_seg) {
    this.fat_seg.clearRect(0, 0, 400, 400);
    this.fat_seg.translate(200/2, 200/2);
    this.fat_seg.rotate(Math.PI / -720);
    this.fat_seg.translate(-200/2, -200/2);
    this.fat_seg.beginPath();
    this.fat_seg.setLineDash([2,10]);
    this.fat_seg.arc(100,100,50,0,2*Math.PI);
    this.fat_seg.lineWidth = 10;
    this.fat_seg.stroke();
  }

  if (this.thin_long_seg) {
    this.thin_long_seg.clearRect(0, 0, 400, 400);
    this.thin_long_seg.translate(200/2, 200/2);
    this.thin_long_seg.rotate(Math.PI / 720);
    this.thin_long_seg.translate(-200/2, -200/2);
    this.thin_long_seg.beginPath();
    this.thin_long_seg.setLineDash([2,10]);
    this.thin_long_seg.arc(100,100,60,0,2*Math.PI);
    this.thin_long_seg.lineWidth = 10;
    this.thin_long_seg.stroke();
  }

  if (this.thin_short_seg) {
    this.thin_short_seg.clearRect(0, 0, 400, 400);
    this.thin_short_seg.translate(200/2, 200/2);
    this.thin_short_seg.rotate(Math.PI / -720);
    this.thin_short_seg.translate(-200/2, -200/2);
    this.thin_short_seg.beginPath();
    this.thin_short_seg.setLineDash([2,10]);
    this.thin_short_seg.arc(100,100,70,0,2*Math.PI);
    this.thin_short_seg.lineWidth = 10;
    this.thin_short_seg.stroke();
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

  circle_1.init(document.getElementById('circle-canvas-1'), document.getElementById('circle-canvas-2'), document.getElementById('circle-canvas-3'), document.getElementById('circle-canvas-4'));
  circle_2.init(document.getElementById('circle-canvas-5'), document.getElementById('circle-canvas-6'), document.getElementById('circle-canvas-7'), document.getElementById('circle-canvas-8'));

  setInterval(circle_1.animate.bind(circle_1), 10);
  setInterval(circle_2.animate.bind(circle_2), 10);
};
},{"../constructors/DrawCircle":1}]},{},[3]);