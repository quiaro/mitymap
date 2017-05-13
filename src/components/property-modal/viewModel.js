const ko = require('knockout');
const VendorAPI = require('../../js/vendorAPI.js');
const { capitalizeFirstLetter, trimAddress, moneyFormat } = require('../../js/utils.js');

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
      isLot: property.isLot,
      address: `${property.project} - ${trimAddress(property.address)}`,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      salePrice: moneyFormat.to(property.salePrice)
    };
  }

  getAdditionalPropertyData(placeResult) {
    return {
      photo: placeResult.photos && placeResult.photos.length && placeResult.photos[0].getUrl({
        maxHeight: 400,
        maxWidth: 400,
      }),
      phone_number: placeResult.formatted_phone_number,
      rating: placeResult.rating,
      website: placeResult.website
    }
  }

  /**
   * Load property data into property observable. If the vendorAPI failed to
   * initialize, we'll still display the most basic information on the property.
   */
  loadPropertyData(property) {
    const basicPropertyData = this.getBasicPropertyData(property);
    let propertyData = Object.assign(basicPropertyData, { basic: true, photo: false });

    if (!this.vendorAPI) {
      return this.property(propertyData);
    }

    // Set observable to property data and start loading spinner while
    // the rest of the information is fetched via the vendorAPI
    this.isLoading(true);
    this.property(propertyData);

    this.vendorAPI.fetchPropertyDetails(property)
      .then(placeResult => {
        const propertyDetails = this.getAdditionalPropertyData(placeResult);
        propertyData = Object.assign({}, propertyData, propertyDetails, { basic: false });
        // Update observable with property data (merged with API
        // data) and stop loading spinner
        this.property(propertyData);
        this.isLoading(false);
      }, (e) => {
        console.warn(e);
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
