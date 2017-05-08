const ko = require('knockout');

class viewModel {
  constructor(params) {
    this.properties = params.properties;
    this.visibleProperties = params.visibleProperties;
    this.updatePropertiesHandler = params.updatePropertiesHandler;

    // Properties specific to this component's context
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
