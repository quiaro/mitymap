const ko = require('knockout');
const apiAdapter = require('../../js/apiAdapter');
const { capitalizeFirstLetter } = require('../../js/utils.js');

class viewModel {
  constructor(params) {
    this.selectedProperty = params.selectedProperty;
    this.actionBtnHandler = params.onActionBtnClick;

    // Properties specific to this component's context
    this.isModalOpen = ko.observable(false);
    this.isLoading = ko.observable(false);
    this.property = ko.observable();

    /* --- Explicit subscriptions on observables ---*/
    this.selectedProperty.subscribe(property => {
      // Whenever the selected property value changes from null to a property,
      // the modal should open with the selected property information.
      if (property) {
        const type = capitalizeFirstLetter(property.type)
        const title = `${type} in ${property.project}`;
        const propertyData = {
          title: title,
          address: property.address,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          salePrice: property.salePrice,
          extended: false
        };
        // Set observable to property data and start loading spinner to get
        // the rest of the information from API call(s)
        this.isLoading(true);
        this.property(propertyData);

        apiAdapter.loadPropertyData(property)
                  .then((apiData) => {
                    const data = Object.assign(propertyData, apiData, { extended: true });
                    // Update observable with property data (merged with API
                    // data) and stop loading spinner
                    this.property(data);
                    this.isLoading(false);
                  }, () => {
                    // Stop loading spinner
                    this.isLoading(false);
                  });
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
