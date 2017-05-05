const ko = require('knockout');
const template = require('./template.html');

class viewModel {
  constructor(params) {
    this.clickHandler = params.clickHandler;
    // Properties specific to this component's context
    this.propTypeSelected = ko.observable('0');
    this.isLocationAnywhere = ko.observable(false);
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
