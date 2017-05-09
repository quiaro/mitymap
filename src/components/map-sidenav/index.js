const ko = require('knockout');
const viewModel = require('./viewModel.js');
const template = require('./template.html');
const filtersPanel = require('../filters-panel');
const propertiesPanel = require('../properties-panel');

// Register sub-component
ko.components.register('filters-panel', filtersPanel);
ko.components.register('properties-panel', propertiesPanel);

ko.bindingHandlers.sideNavSetup = {
  init: function(element) {
    $(element).sideNav({ menuWidth: 380 })
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

    // Initialize properties panel:
    // The first time this handler is called, the custom elements have not
    // finished setting up (i.e. filtersPanel and propertiesPanel are empty).
    // Setting a class of 'hidden' on the propertiesPanel is a work-around
    // to keep the propertiesPanel hidden (so it doesn't conflict with the
    // filtersPanel) until this handler is called again via a user interaction.
    if (propertiesPanel.hasClass('hidden')) {
      // The translateX value is quickly set and the 'hidden' class is removed
      propertiesPanel.velocity(
        {'translateX': '-100%'},
        { duration: 1,
          queue: false,
          complete: function() {
            // Open the filters panel
            propertiesPanel.removeClass('hidden');
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
  viewModel: viewModel,
  template: template
}
