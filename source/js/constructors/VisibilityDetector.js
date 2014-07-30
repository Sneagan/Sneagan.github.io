var VisibilityDetector = function(){};
VisibilityDetector.prototype.fireIfVisible = function(callback) {
  var self = this;
  return (function () {
    if (self.isFullyInViewport() || self.isPartiallyInViewport()) {
      if (!self.is_in_viewport) {
        // Only trigger the callback once.
        self.is_in_viewport = true;
        callback();
      }
    } else {
      self.is_in_viewport = false;
      if (self.is_animating) self.stopAnimating();
    }
  })();
};

VisibilityDetector.prototype.fireIfFullyVisible = function(callback) {
  var self = this;
  console.log('running');
  return (function () {
    if (self.isFullyInViewport()) {
      if (!self.is_in_viewport) {
        // Only trigger the callback once.
        self.is_in_viewport = true;
        callback();
      }
    } else {
      self.is_in_viewport = false;
      if (self.is_animating) self.stopAnimating();
    }
  })();
};

VisibilityDetector.prototype.isFullyInViewport = function($el) {
  var rect = this.$container.getBoundingClientRect();
  return (
    !this.isHidden(this.$container) &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && // $(window).height()
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) // $(window).width()
  );
};
VisibilityDetector.prototype.isPartiallyInViewport = function($el) {
  var rect = this.$container.getBoundingClientRect();
  return (
    !this.isHidden(this.$container) &&
    rect.top + this.$container.offsetHeight >= 0 &&
    rect.left >= 0 &&
    rect.bottom - this.$container.offsetHeight <= (window.innerHeight || document.documentElement.clientHeight) && // $(window).height()
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) // $(window).width()
  );
};
VisibilityDetector.prototype.isHidden = function($el) {
  return ($el.offsetParent === null);
};

module.exports = VisibilityDetector;