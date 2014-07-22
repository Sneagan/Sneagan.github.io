(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){

},{}]},{},[1,2]);