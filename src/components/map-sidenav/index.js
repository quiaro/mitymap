const ko = require('knockout');
const template = require('./template.html');

class viewModel {
  constructor() {
    this.isSideNavOpen = ko.observable(false)
  }
  openSideNav() {
    // Sync observable with DOM
    this.isSideNavOpen(true)
  }
  closeSideNav() {
    this.isSideNavOpen(false)
  }
}

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
