const ko = require('knockout');
const ViewModel = require('./ViewModel.js');
const template = require('./template.html');
const filtersPanel = require('../filters-panel');
const propertiesPanel = require('../properties-panel');

// Register sub-component
ko.components.register('filters-panel', filtersPanel);
ko.components.register('properties-panel', propertiesPanel);

ko.bindingHandlers.sideNavSetup = {
  init: function(element) {
    let menuWidth = 310;
    if (window.matchMedia("(min-width: 600px)").matches) {
      menuWidth = 400;
    }
    $(element).sideNav({ menuWidth: menuWidth });
    $(element).sideNav('show');
  },
  update: function(element, valueAccessor) {
    const observable = valueAccessor();
    const isOpen = ko.unwrap(observable);
    if (!isOpen) {
      $(element).sideNav('hide');
    }
  }
};

// Handler to toggle the visibility of the panels in the side nav (filters
// panel vs properties panel)
ko.bindingHandlers.switchPanel = {
  update: function(element, valueAccessor) {
    const observable = valueAccessor();
    const isShowingFilters = ko.unwrap(observable);
    const filtersPanel = $(element).find('filters-panel > .container');
    const propertiesPanel = $(element).find('properties-panel > .container');

    // Initialize filters panel:
    // The first time this handler is called, the custom elements have not
    // finished setting up (i.e. filtersPanel and propertiesPanel are empty).
    // Setting a class of 'hidden' on the propertiesPanel is a work-around
    // to keep the propertiesPanel hidden (so it doesn't conflict with the
    // filtersPanel) until this handler is called again via a user interaction.
    if (filtersPanel.hasClass('hidden')) {
      // The translateX value is quickly set and the 'hidden' class is removed
      filtersPanel.velocity(
        {'translateX': '-100%'},
        { duration: 1,
          queue: false,
          complete: function() {
            // Open the filters panel
            filtersPanel.removeClass('hidden');
          }
        })
    }

    if (isShowingFilters) {
      // Close the properties panel
      propertiesPanel.velocity(
        {'translateX': '-100%'},
        { duration: 200,
          queue: false,
          easing: 'easeOutCubic',
          complete: function() {
            // Open the filters panel
            filtersPanel.velocity(
              {'translateX': '0'},
              { duration: 400,
                queue: false,
                easing: 'easeOutCubic' })
          }
        })
    } else {
      // Close the filters panel
      filtersPanel.velocity(
        {'translateX': '-100%'},
        { duration: 200,
          queue: false,
          easing: 'easeOutCubic',
          complete: function() {
            // Open the properties panel
            propertiesPanel.velocity(
              {'translateX': '0'},
              { duration: 400,
                queue: false,
                easing: 'easeOutCubic' })
          }
        })
    }
  }
};

module.exports = {
  viewModel: ViewModel,
  template: template
}
