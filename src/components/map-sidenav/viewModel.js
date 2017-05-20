const ko = require('knockout');

class ViewModel {
  constructor(params) {
    this.googleApi = params.googleApi;
    this.map = params.map;
    this.properties = params.properties;
    this.visibleProperties = params.visibleProperties;
    this.updatePropertiesHandler = params.updatePropertiesHandler;

    // Event handlers
    this.onSelectProperty = params.onSelectProperty;
    this.openHandler = params.onOpen;
    this.closeHandler = params.onClose;

    // Properties specific to this component's context
    this.isSideNavOpen = ko.observable(true);
    this.isShowingFilters = ko.observable(false);
  }
  openSideNav() {
    // Sync observable with DOM
    this.openHandler();
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

module.exports = ViewModel;
