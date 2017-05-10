const ko = require('knockout');

class viewModel {
  constructor(params) {
    this.properties = params.properties;
    this.visibleProperties = params.visibleProperties;
    this.updatePropertiesHandler = params.updatePropertiesHandler;

    // Event handlers
    this.onSelectProperty = params.onSelectProperty;
    this.closeHandler = params.onClose;

    // Properties specific to this component's context
    this.isSideNavOpen = ko.observable(false);
    this.isShowingFilters = ko.observable(true);
  }
  openSideNav() {
    // Sync observable with DOM
    this.isSideNavOpen(true)
  }
  closeSideNav() {
    this.isSideNavOpen(false)
    this.closeHandler();
  }
  switchToProperties() {
    this.isShowingFilters(false)
  }
  switchToFilters() {
    this.isShowingFilters(true)
  }
}

module.exports = viewModel;
