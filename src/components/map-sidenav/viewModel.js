const ko = require('knockout');

class viewModel {
  constructor(params) {
    this.visibleProperties = params.visibleProperties;
    this.filterPropertiesHandler = params.filterPropertiesHandler;
    this.isSideNavOpen = ko.observable(false);
  }
  openSideNav() {
    // Sync observable with DOM
    this.isSideNavOpen(true)
  }
  closeSideNav() {
    this.isSideNavOpen(false)
  }
}

module.exports = viewModel;
