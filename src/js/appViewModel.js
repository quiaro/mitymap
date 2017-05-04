
class appViewModel {

  constructor(config) {
    this.sideNavOpen = config.sidenavOpen
  }

  closeSideNav() {
    this.sideNavOpen(false)
  }
}

module.exports = appViewModel;
