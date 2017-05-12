const google = require('googleApi');

/**
 * Class that uses 3rd-party APIs (Google Places) to fetch additional
 * information related to a property.
 */
class vendorAPI {

  /**
   * @constructor
   * @param {object} googleMap - Google Map instance
   */
  constructor(googleMap) {
    if (!googleMap) {
      throw new ReferenceError('Google map is required to instantiate vendorAPI');
    }
    this.placeService = new google.maps.places.PlacesService(googleMap);
  }

  getAPIerror(property, errorStatus) {
    if (errorStatus === 'ZERO_RESULTS') {
      return `No results found for ${property.id}@${property.project}`;
    }
    return `Query could be not processed [${errorStatus}]`;
  }

  getPlaceId(property) {
    return new Promise((resolve, reject) => {
      this.placeService.nearbySearch({
        location: property.coordinates,
        name: property.project,
        radius: 500
      }, (results, status) => {
        if (status === 'OK') {
          resolve(results[0].place_id);
        } else {
          reject(status);
        }
      })
    })
  }

  getPlaceDetails(placeId) {
    return new Promise((resolve, reject) => {
      this.placeService.getDetails({
        placeId: placeId
      }, (details, status) => {
        if (status === 'OK') {
          resolve(details);
        } else {
          reject(status);
        }
      })
    });
  }

  /**
   * Use Google Places API to fetch information on a property
   * @param {object} property - Property instance (see models/Property)
   */
  fetchPropertyDetails(property) {
    return this.getPlaceId(property)
      .then(this.getPlaceDetails.bind(this))
      .catch(errorStatus => {
        const error = this.getAPIerror(property, errorStatus);
        throw error;
      })
  }
}

module.exports = vendorAPI;
