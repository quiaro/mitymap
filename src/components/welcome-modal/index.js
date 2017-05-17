const ko = require('knockout');
const ViewModel = require('./ViewModel.js');
const template = require('./template.html');

ko.bindingHandlers.welcomeModalSetup = {
  init: function(element) {
    // Initialize modal and attach it to component DOM element
    $(element).modal({
      dismissible: true
    })
  },
  update: function(element, valueAccessor) {
    const observable = valueAccessor();
    const isOpen = ko.unwrap(observable);
    if (isOpen) {
      $(element).modal('open');
    } else {
      $(element).modal('close');
    }
  }
};

module.exports = {
  viewModel: ViewModel,
  template: template
}
