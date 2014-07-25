var VisibilityDector = require('./VisibilityDetector');

var DrawCircle = function(){};
DrawCircle.prototype = new VisibilityDector();
DrawCircle.prototype.constructor = DrawCircle;
DrawCircle.prototype.init = function($el1, $el2, $el3, $el4) {
  this.dotted = $el1.getContext("2d");
  this.fat_seg = $el2.getContext("2d");
  this.thin_long_seg = $el3.getContext("2d");
  this.thin_short_seg = $el4.getContext("2d");

  this.$dotted = $el1;
  this.$fat_seg = $el2;
  this.$thin_long_seg = $el3;
  this.$thin_short_seg = $el4;
};
DrawCircle.prototype.animate = function(deg1, deg2, deg3, deg4) {
  if (this.dotted) {
    var dotted = this.dotted;
    var $dotted = this.$dotted;
    dotted.clearRect(0, 0, $dotted.width, $dotted.height);
    dotted.translate($dotted.width/2, $dotted.height/2);
    dotted.rotate(Math.PI / deg1);
    dotted.translate(-$dotted.width/2, -$dotted.height/2);
    dotted.beginPath();
    dotted.setLineDash([2,6.6]);
    dotted.arc(200,200,115,0,2*Math.PI);
    dotted.lineWidth = 7;
    dotted.strokeStyle = '#ed2435';
    dotted.stroke();
  }
  if (this.fat_seg) {
    var fat_seg = this.fat_seg;
    var $fat_seg = this.$fat_seg;
    fat_seg.clearRect(0, 0, $fat_seg.width, $fat_seg.height);
    fat_seg.translate($fat_seg.width/2, $fat_seg.height/2);
    fat_seg.rotate(Math.PI / deg2);
    fat_seg.translate(-$fat_seg.width/2, -$fat_seg.height/2);
    fat_seg.beginPath();
    fat_seg.arc(200,200,100,180,2*Math.PI);
    fat_seg.lineWidth = 15;
    fat_seg.strokeStyle = '#ed2435';
    fat_seg.stroke();
  }

  if (this.thin_long_seg) {
    var thin_long_seg = this.thin_long_seg;
    var $thin_long_seg = this.$thin_long_seg;
    thin_long_seg.clearRect(0, 0, $thin_long_seg.width, $thin_long_seg.height);
    thin_long_seg.translate($thin_long_seg.width/2, $thin_long_seg.height/2);
    thin_long_seg.rotate(Math.PI / deg3);
    thin_long_seg.translate(-$thin_long_seg.width/2, -$thin_long_seg.height/2);
    thin_long_seg.beginPath();
    thin_long_seg.arc(200,200,125,360,2*Math.PI);
    thin_long_seg.lineWidth = 5;
    thin_long_seg.strokeStyle = '#ed2435';
    thin_long_seg.stroke();
  }

  if (this.thin_short_seg) {
    var thin_short_seg = this.thin_short_seg;
    var $thin_short_seg = this.$thin_short_seg;
    thin_short_seg.clearRect(0, 0, $thin_short_seg.width, $thin_short_seg.height);
    thin_short_seg.translate($thin_short_seg.width/2, $thin_short_seg.height/2);
    thin_short_seg.rotate(Math.PI / deg4);
    thin_short_seg.translate(-$thin_short_seg.width/2, -$thin_short_seg.height/2);
    thin_short_seg.beginPath();
    thin_short_seg.arc(200,200,100,350,2*Math.PI);
    thin_short_seg.lineWidth = 5;
    thin_short_seg.strokeStyle = '#ed2435';
    thin_short_seg.stroke();
  }
};

module.exports = DrawCircle;