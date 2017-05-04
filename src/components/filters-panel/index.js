const ko = require('knockout');
const template = require('./template.html');

class viewModel {
  constructor(params) {
    this.isOpen = params.isOpen
  }
}

ko.bindingHandlers.selectSetup = {
  init: function(element) {
    $(element).material_select();
  }
};

module.exports = {
  viewModel: viewModel,
  template: template
}
