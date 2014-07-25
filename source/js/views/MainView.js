var DrawCircle = require('../constructors/DrawCircle');

window.onload = function() {
  console.log('starting');
  var circle_1 = new DrawCircle();
  var circle_2 = new DrawCircle();

  circle_1.init(document.getElementById('circle-canvas-1'), document.getElementById('circle-canvas-2'), document.getElementById('circle-canvas-3'), document.getElementById('circle-canvas-4'));
  circle_2.init(document.getElementById('circle-canvas-5'), document.getElementById('circle-canvas-6'), document.getElementById('circle-canvas-7'), document.getElementById('circle-canvas-8'));

  setInterval(circle_1.animate.bind(circle_1), 5);
  setInterval(circle_2.animate.bind(circle_2), 5);
};