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
    this.dotted.translate(400/2, 400/2);
    this.dotted.rotate(Math.PI / -720);
    this.dotted.translate(-400/2, -400/2);
    this.dotted.beginPath();
    this.dotted.setLineDash([2,6.6]);
    this.dotted.arc(200,200,115,0,2*Math.PI);
    this.dotted.lineWidth = 7;
    this.dotted.strokeStyle = '#ed2435';
    this.dotted.stroke();
  }
  if (this.fat_seg) {
    this.fat_seg.clearRect(0, 0, 400, 400);
    this.fat_seg.translate(400/2, 400/2);
    this.fat_seg.rotate(Math.PI / -360);
    this.fat_seg.translate(-400/2, -400/2);
    this.fat_seg.beginPath();
    //this.fat_seg.setLineDash([2,10]);
    this.fat_seg.arc(200,200,100,180,2*Math.PI);
    this.fat_seg.lineWidth = 15;
    this.fat_seg.strokeStyle = '#ed2435';
    this.fat_seg.stroke();
  }

  if (this.thin_long_seg) {
    this.thin_long_seg.clearRect(0, 0, 400, 400);
    this.thin_long_seg.translate(400/2, 400/2);
    this.thin_long_seg.rotate(Math.PI / 720);
    this.thin_long_seg.translate(-400/2, -400/2);
    this.thin_long_seg.beginPath();
    //this.thin_long_seg.setLineDash([2,10]);
    this.thin_long_seg.arc(200,200,125,360,2*Math.PI);
    this.thin_long_seg.lineWidth = 5;
    this.thin_long_seg.strokeStyle = '#ed2435';
    this.thin_long_seg.stroke();
  }

  if (this.thin_short_seg) {
    this.thin_short_seg.clearRect(0, 0, 400, 400);
    this.thin_short_seg.translate(400/2, 400/2);
    this.thin_short_seg.rotate(Math.PI / 360);
    this.thin_short_seg.translate(-400/2, -400/2);
    this.thin_short_seg.beginPath();
    //this.thin_short_seg.setLineDash([2,10]);
    this.thin_short_seg.arc(200,200,100,350,2*Math.PI);
    this.thin_short_seg.lineWidth = 5;
    this.thin_short_seg.strokeStyle = '#ed2435';
    this.thin_short_seg.stroke();
  }
};

module.exports = DrawCircle;