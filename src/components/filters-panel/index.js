const ko = require('knockout');
const viewModel = require('./viewModel.js');
const template = require('./template.html');
const rangeFilter = require('../range-filter');

// Register sub-component
ko.components.register('range-filter', rangeFilter);

ko.bindingHandlers.selectSetup = {
  init: (element) =>  {
    $(element).material_select();
  }
};

module.exports = {
  viewModel: viewModel,
  template: template
}
