var VisibilityDetector = require('./VisibilityDetector');

var NavigationHighlighter = function(){};
NavigationHighlighter.prototype = new VisibilityDetector();
NavigationHighlighter.prototype.constructor = NavigationHighlighter;
NavigationHighlighter.prototype.init = function($el, $button) {
  this.$container = $el;
  this.$button = $button;
  this.$all_buttons = this.getSiblings($button);
  this.$all_buttons.push($button);
};
NavigationHighlighter.prototype.getChildren = function(n, skipMe) {
  var r = [];
  var elem = null;
  for ( ; n; n = n.nextSibling ) 
    if ( n.nodeType == 1 && n != skipMe) r.push( n );        
  return r;
};
NavigationHighlighter.prototype.getSiblings = function(n) {
  return this.getChildren(n.parentNode.firstChild, n);
};
NavigationHighlighter.prototype.highlightNavButton = function() {
  for (var i = 0; i < this.$all_buttons.length; i++) {
    this.$all_buttons[i].classList.remove('active');
  }
  this.$button.classList.add('active');
};

module.exports = NavigationHighlighter;