const ko = require('knockout');
const VendorAPI = require('../../js/VendorAPI.js');
const { capitalizeFirstLetter, trimAddress, moneyFormat } = require('../../js/utils.js');

class ViewModel {
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
      salePrice: moneyFormat.to(property.salePrice),
      photo: false,
      phone_number: false,
      rating: false,
      website: false
    };
  }

  getAdditionalPropertyData(placeResult) {
    const photo = placeResult.photos && placeResult.photos.length && placeResult.photos[0].getUrl({
      maxHeight: 400,
      maxWidth: 400,
    });
    return {
      photo: photo ? photo : false,
      phone_number: placeResult.formatted_phone_number,
      rating: placeResult.rating,
      website: placeResult.website
    }
  }

  getWeatherData(weatherResult) {
    const weatherIconURL = 'http://openweathermap.org/img/w/';
    const hasWeather = weatherResult.weather && weatherResult.weather.length;
    return {
      weather_icon: hasWeather && (weatherIconURL + weatherResult.weather[0].icon + '.png'),
      weather_description: hasWeather && weatherResult.weather[0].description,
      weather_temperature: weatherResult.main.temp
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

    const weatherDetailsPromise = this.vendorAPI.fetchWeatherDetails(property.coordinates);
    const propertyDetailsPromise = this.vendorAPI.fetchPropertyDetails(property);

    Promise.all([ weatherDetailsPromise, propertyDetailsPromise ])
      .then(data => {
        const weatherData = this.getWeatherData(data[0]);
        const propertyDetails = this.getAdditionalPropertyData(data[1]);
        propertyData = Object.assign({}, propertyData, weatherData, propertyDetails, { basic: false });

        // Update observable with property data (merged with API
        // data) and stop loading spinner
        this.property(propertyData);
        this.isLoading(false);
      })
      .catch((e) => {
        // Additional information is not crucial so any failures will only
        // be logged as warnings
        console.warn(e);
        // Stop loading spinner
        this.isLoading(false);
      })
  }

  onActionBtnClick() {
    this.isModalOpen(false);
  }
}

module.exports = ViewModel;
