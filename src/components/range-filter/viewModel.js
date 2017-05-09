
class viewModel {
  constructor(params) {
    this.filter = params.filter;
    this.bounds = params.bounds;
    this.minValue = params.minValue;
    this.maxValue = params.maxValue;
    this.title = 'Filter by ' + params.label;
  }
}

module.exports = viewModel;
