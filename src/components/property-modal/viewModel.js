const ko = require('knockout');

class viewModel {
  constructor(params) {
    this.selectedProperty = params.selectedProperty;
    this.actionBtnHandler = params.onActionBtnClick;

    this.isModalOpen = ko.observable(false);

    /* --- Explicit subscriptions on observables ---*/
    this.selectedProperty.subscribe(property => {
      // Whenever the selected property value changes from null to a property,
      // the modal should open with the selected property information.
      if (property) {
        console.info('Selected property: ', property);
        this.isModalOpen(true);
      }
    });
  }

  onActionBtnClick() {
    this.actionBtnHandler();
    this.isModalOpen(false);
  }
}

module.exports = viewModel;
