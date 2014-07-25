var Spinner = require('../constructors/Spinner');
var WatchForMe = [];
window.onload = function() {
  console.log('starting');
  var circle_1 = new Spinner();
  var circle_2 = new Spinner();

  circle_1.init(document.getElementById('interactive-1'), 400);
  circle_2.init(document.getElementById('interactive-2'), 400);
  circle_1.setAnimationDegrees([720, -360, 360, 360]);
  circle_2.setAnimationDegrees([-720, 360, -360, -720]);
  
  WatchForMe.push(circle_1);
  WatchForMe.push(circle_2);
};
window.onscroll = function() {
  for (var i = 0; i < WatchForMe.length; i++) {
    var currentAnimation = WatchForMe[i];
    currentAnimation.fireIfVisible(currentAnimation.animate.bind(currentAnimation));
  }
};