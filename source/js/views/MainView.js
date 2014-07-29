var Spinner = require('../constructors/Spinner');
var Divider = require('../constructors/Divider');

var WatchForMe = [];

function animationHandler() {
  for (var i = 0; i < WatchForMe.length; i++) {
    var currentAnimation = WatchForMe[i];
    currentAnimation.fireIfVisible(currentAnimation.animate.bind(currentAnimation));
  }
}

window.onload = function() {
  console.log('starting');
  var spinner_1 = new Spinner();
  var spinner_2 = new Spinner();

  spinner_1.init(document.getElementsByClassName('spinner')[0], 400);
  spinner_2.init(document.getElementsByClassName('spinner')[1], 400);
  spinner_1.setAnimationDegrees([720, -360, 360, 360]);
  spinner_2.setAnimationDegrees([-720, 360, -360, -720]);
  
  WatchForMe.push(spinner_1);
  WatchForMe.push(spinner_2);

  var dividers = document.getElementsByClassName('animated-divider');
  for (var i = 0; i < dividers.length; i++) {
    var divider = new Divider();
    divider.init(dividers[i]);
  }
  animationHandler();
};

window.onscroll = function() {
  animationHandler();
};