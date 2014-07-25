var Spinner = require('../constructors/Spinner');


window.onload = function() {
  console.log('starting');
  var circle_1 = new Spinner();
  var circle_2 = new Spinner();

  circle_1.init(document.getElementById('interactive-1'), 400);
  circle_1.animate(720, -360, 360, 360);

  circle_2.init(document.getElementById('interactive-2'), 400);
  circle_2.animate(-720, 360, -360, -720);
};