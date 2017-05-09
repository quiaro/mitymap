
class viewModel {
  constructor(params) {
    this.filter = params.filter;
    this.bounds = params.bounds;
    this.minValue = params.minValue;
    this.maxValue = params.maxValue;
    this.title = params.label;
    this.unit = params.unit;
  }
}

module.exports = viewModel;
