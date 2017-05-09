class viewModel {
  constructor(params) {
    // Observables (read-only)
    this.visibleProperties = params.visibleProperties;

    // Handlers to modify state
    this.clickHandler = params.clickHandler;
    this.doneHandler = params.doneHandler;
  }
}

module.exports = viewModel;
