const ko = require('knockout');
const template = require('./template.html');

class viewModel {

  constructor() {
    this.isSideNavOpen = ko.observable(false)
  }

  closeSideNav() {
    this.isSideNavOpen(false)
  }
}

module.exports = {
  viewModel: viewModel,
  template: template
}
