const ko = require('knockout');
const template = require('./template.html');

class viewModel {
  constructor(params) {
    this.clickHandler = params.clickHandler;
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
