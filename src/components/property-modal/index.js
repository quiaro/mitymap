const ko = require('knockout');
const viewModel = require('./viewModel.js');
const template = require('./template.html');

ko.bindingHandlers.propertyModalSetup = {
  init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    // Initialize modal and attach it to component DOM element
    $(element).modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      complete: () => {
        // Callback on modal close: sync observable with DOM in case the modal
        // was dismissed by clicking outside of it.
        bindingContext.$data.isModalOpen(false);
      }
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
  viewModel: viewModel,
  template: template
}
