const ko = require('knockout');
const template = require('./template.html');

class viewModel {
  constructor() {
    this.isFiltersOpen = ko.observable(false)
  }
}

ko.bindingHandlers.sideNavSetup = {
  init: function(element) {
    $(element).sideNav({ menuWidth: 380 })
  }
};

module.exports = {
  viewModel: viewModel,
  template: template
}
