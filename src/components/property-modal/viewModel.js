const ko = require('knockout');
const VendorAPI = require('../../js/vendorAPI.js');
const { capitalizeFirstLetter } = require('../../js/utils.js');

class viewModel {
  constructor(params) {
    this.selectedProperty = params.selectedProperty;
    this.actionBtnHandler = params.onActionBtnClick;

    // Properties specific to this component's context
    this.isModalOpen = ko.observable(false);
    this.isLoading = ko.observable(false);
    this.property = ko.observable();
    try {
      this.vendorAPI = new VendorAPI(params.map);
    } catch(e) {
      if (e instanceof ReferenceError) {
        console.error(e);
      } else {
        // No idea what this error is about. Throw it.
        throw e;
      }
    }

    /* --- Explicit subscriptions on observables ---*/
    this.selectedProperty.subscribe(property => {
      if (property) {
        // Whenever the selected property value changes from null to a property,
        // the modal should open with the selected property information.
        this.loadPropertyData(property);
        this.isModalOpen(true);
      }
    });
  }

  getBasicPropertyData(property) {
    const type = capitalizeFirstLetter(property.type)
    const title = `${type} in ${property.project}`;
    return {
      title: title,
      address: property.address,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      salePrice: property.salePrice
    };
  }

  /**
   * Load property data into property observable. If the vendorAPI failed to
   * initialize, we'll still display the most basic information on the property.
   */
  loadPropertyData(property) {
    const basicPropertyData = this.getBasicPropertyData(property);
    let propertyData = Object.assign(basicPropertyData, { basic: true });

    if (!this.vendorAPI) {
      return this.property(propertyData);
    }

    // Set observable to property data and start loading spinner while
    // the rest of the information is fetched via the vendorAPI
    this.isLoading(true);
    this.property(propertyData);

    this.vendorAPI.fetchPropertyDetails(property)
      .then(apiData => {
        console.info(apiData);
        propertyData = Object.assign({}, propertyData, apiData, { basic: true });
        // Update observable with property data (merged with API
        // data) and stop loading spinner
        this.property(propertyData);
        this.isLoading(false);
      }, (e) => {
        console.error(e);
        // Stop loading spinner
        this.isLoading(false);
      });
  }

  onActionBtnClick() {
    this.actionBtnHandler();
    this.isModalOpen(false);
  }
}

module.exports = viewModel;
