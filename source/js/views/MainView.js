var DrawCircle = require('../constructors/DrawCircle');

window.onload = function() {
  console.log('starting');
  var this_Circle = new DrawCircle();
  this_Circle.init(document.getElementById('interactive-1'));
  setInterval(this_Circle.animate.bind(this_Circle), 20);
};