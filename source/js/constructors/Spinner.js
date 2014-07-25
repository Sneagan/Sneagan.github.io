var Spinner = function(){};
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
Spinner.prototype.compensateForHighDPI = function($el) {
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
Spinner.prototype.animate = function(deg1, deg2, deg3, deg4) {
  this.animationInterval = setInterval(this.transform.bind(this, deg1, deg2, deg3, deg4), 16.6);
};
Spinner.prototype.stopAnimating = function() {
  window.clearInterval(this.animationInterval);
};
Spinner.prototype.transform = function(deg1, deg2, deg3, deg4) {
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

module.exports = Spinner;