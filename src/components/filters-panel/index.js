const ko = require('knockout');
const ViewModel = require('./ViewModel.js');
const template = require('./template.html');
const rangeFilter = require('../range-filter');
const locationFilter = require('../location-filter');

// Register sub-components
ko.components.register('range-filter', rangeFilter);
ko.components.register('location-filter', locationFilter);

ko.bindingHandlers.selectSetup = {
  init: (element) =>  {
    $(element).material_select();
  }
};

ko.bindingHandlers.filterTipSetup = {
  init: (element, valueAccessor) =>  {
    const observable = valueAccessor();
    const isTipShowing = ko.unwrap(observable);
    if (isTipShowing) {
      element.addEventListener("transitionend", function(e) {
        if (e.target === this) {
          // After the element is off the screen, merge the bottom margin with
          // the height of the element to have the element's complete height.
          // At this point, the element's height can be reduced to 0 without
          // any jumps on the screen.
          const $el = $(this);
          const height = parseInt($el.css('height').split('px')[0])
          const marginBottom = parseInt($el.css('marginBottom').split('px')[0])
          $el.css({
            'height': height + marginBottom + 'px',
            'marginBottom': 0,
            'padding': 0
          });

          $(this).velocity({ height: 0},
            { duration: 300,
              queue: false,
              easing: 'easeOutQuad',
              complete: function() {
                $(this).css('display', 'none');
                // Don't show the filters tip anymore
                localStorage.setItem('filtersTipShown', true);
              }
            });
        }
      }, false);
    }
  }
};

module.exports = {
  viewModel: ViewModel,
  template: template
}
