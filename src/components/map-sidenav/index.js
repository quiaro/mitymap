const ko = require('knockout');
const viewModel = require('./viewModel.js');
const template = require('./template.html');
const filtersPanel = require('../filters-panel');

// Register sub-component
ko.components.register('filters-panel', filtersPanel);

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

module.exports = {
  viewModel: viewModel,
  template: template
}
