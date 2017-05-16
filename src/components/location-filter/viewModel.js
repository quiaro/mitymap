const ko = require('knockout');
const google = require('googleApi');

class ViewModel {
  constructor(params) {
    this.properties = params.properties;
    this.propFilters = params.propFilters;
    this.propTypeSelected = params.propTypeSelected;
    this.visibleProperties = params.visibleProperties;
    this.updatePropertiesHandler = params.updatePropertiesHandler;

    // Properties specific to this component's context
    this.searchArea = ko.observable('anywhere');
    // Polygon defining the central valley
    this.gamArea = new google.maps.Polygon({
      clickable: false,
      paths: [
              {lat: 10.0907, lng: -84.4778 },  // San Ramon
              {lat: 10.0755, lng: -84.3222 },  // Grecia
              {lat: 10.0202, lng: -84.1279 },  // Barva
              {lat: 9.9738,  lng: -84.0186 },  // San Isidro
              {lat: 9.9159,  lng: -83.8984 },  // Tierra Blanca
              {lat: 9.8384,  lng: -83.8790 },  // Paraíso
              {lat: 9.8440,  lng: -83.9696 },  // Tejar de El Guarco
              {lat: 9.8839,  lng: -84.0407 },  // Patarra
              {lat: 9.9075,  lng: -84.2606 },  // Ciudad Colón
              {lat: 9.9790,  lng: -84.3855 }   // Atenas
            ],
      visible: false,
      map: params.map
    });

    /* --- Explicit subscriptions on observables ---*/
    this.propTypeSelected.subscribe(() => {
      // Whenever the property type changes, the search area will be reset.
      this.searchArea('anywhere');
    });

    this.searchArea.subscribe(value => {
      if (value === 'anywhere') {
        // When the search area value is set to anywhere, calculate the set of
        // visible properties by applying the current set of filters to the
        // entire list of properties
        const filters = this.propFilters();
        const propertyList = this.properties.filterBy(filters);
        this.updatePropertiesHandler(propertyList);
      } else {
        this.filterVisiblePropertiesByLocation();
      }
    });

    this.visibleProperties.subscribe(() => {
      // When other filters are applied, the list of visible properties is
      // updated. Check if this list has to additionally be filtered by
      // location.
      if (this.searchArea() !== 'anywhere') {
        this.filterVisiblePropertiesByLocation();
      }
    })
  }

  filterVisiblePropertiesByLocation() {
    // Calculate the new set of visible properties by filtering out any
    // properties that are outside the central valley from the current set of
    // visible properties.
    const propertyList = [];
    const visibleProperties = this.visibleProperties();

    visibleProperties.forEach((property) => {
      // The containsLocation method throws an error with a latLng literal
      // object so a LatLng instance needs to be created for each coordinate
      // pair
      const latLng = new google.maps.LatLng(property.coordinates);
      if (google.maps.geometry.poly.containsLocation(latLng, this.gamArea)) {
        propertyList.push(property);
      }
    });

    if (propertyList.length < visibleProperties.length) {
      // Update the visible properties list only if the filtered list has a
      // different number of items than the original list.
      this.updatePropertiesHandler(propertyList);
    }
  }
}

module.exports = ViewModel;
