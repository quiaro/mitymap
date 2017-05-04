const template = require('./component.html');

function viewModel(params) {
  this.name = params.value;
}

module.exports = {
  viewModel: viewModel,
  template: template
}
