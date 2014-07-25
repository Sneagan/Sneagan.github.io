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