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

module.exports = {
  viewModel: ViewModel,
  template: template
}
