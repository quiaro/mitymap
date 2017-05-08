const ko = require('knockout');
const viewModel = require('./viewModel.js');
const template = require('./template.html');

ko.bindingHandlers.selectSetup = {
  init: (element) =>  {
    $(element).material_select();
  }
};

module.exports = {
  viewModel: viewModel,
  template: template
}
