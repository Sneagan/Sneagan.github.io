var VisibilityDector = require('./VisibilityDetector');

var DrawCircle = function(){};
DrawCircle.prototype = new VisibilityDector();
DrawCircle.prototype.constructor = DrawCircle;
DrawCircle.prototype.init = function($el) {
  this.dotted = $el.getContext("2d");
};
DrawCircle.prototype.animate = function() {
  if (this.dotted) {
    this.dotted.clearRect(0, 0, 400, 400);
    // Move registration point to the center of the canvas
    this.dotted.translate(400/2, 400/2);
    // Rotate 1 degree
    this.dotted.rotate(Math.PI / 720);
    this.dotted.translate(-400/2, -400/2);
    this.dotted.beginPath();
    this.dotted.setLineDash([2,10]);
    this.dotted.arc(200,200,150,0,2*Math.PI);
    this.dotted.lineWidth = 10;
    this.dotted.stroke();
  }
};

module.exports = DrawCircle;