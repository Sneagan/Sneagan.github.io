var Spinner = require('../constructors/Spinner');
var Divider = require('../constructors/Divider');
var NavigationHighlighter = require('../constructors/NavigationHighlighter');

var WatchForMe = [];
var NavHighlighters = [];

function animationHandler() {
  for (var i = 0; i < WatchForMe.length; i++) {
    var currentAnimation = WatchForMe[i];
    currentAnimation.fireIfVisible(currentAnimation.animate.bind(currentAnimation));
  }
  for (var n = 0; n < NavHighlighters.length; n++) {
    var currentNav = NavHighlighters[n];
    currentNav.fireIfFullyVisible(currentNav.highlightNavButton.bind(currentNav));
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
    WatchForMe.push(divider);
  }
  animationHandler();

  var aboutNavHighlighter = new NavigationHighlighter();
  aboutNavHighlighter.init(document.getElementById('about'), document.getElementsByClassName('navigation')[0]);
  var signupNavHighlighter = new NavigationHighlighter();
  signupNavHighlighter.init(document.getElementById('sign-up'), document.getElementsByClassName('navigation')[1]);
  var partnersNavHighlighter = new NavigationHighlighter();
  partnersNavHighlighter.init(document.getElementById('partners'), document.getElementsByClassName('navigation')[2]);
  var vehiclesNavHighlighter = new NavigationHighlighter();
  vehiclesNavHighlighter.init(document.getElementById('test-vehicles'), document.getElementsByClassName('navigation')[3]);
  NavHighlighters = [aboutNavHighlighter, signupNavHighlighter, partnersNavHighlighter, vehiclesNavHighlighter];

  var hero1 = document.getElementsByClassName('hero-one')[0];
  var hero2 = document.getElementsByClassName('hero-two')[0];
  var heroTimer = setInterval(function() {
    hero1.classList.toggle('active');
    hero2.classList.toggle('active');
  }, 10000);

  document.getElementsByClassName('spinner-container')[0].onmouseover = function() {
    document.getElementsByClassName('hover-details')[0].classList.add('active');
  };
  document.getElementsByClassName('spinner-container')[0].onmouseout = function() {
    document.getElementsByClassName('hover-details')[0].classList.remove('active');
  };
  document.getElementsByClassName('spinner-container')[1].onmouseover = function() {
    document.getElementsByClassName('hover-details')[1].classList.add('active');
  };
  document.getElementsByClassName('spinner-container')[1].onmouseout = function() {
    document.getElementsByClassName('hover-details')[1].classList.remove('active');
  };

};

window.onscroll = function() {
  animationHandler();
};