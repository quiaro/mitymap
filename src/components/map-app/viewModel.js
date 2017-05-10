const ko = require('knockout');
const google = require('googleApi');
const data = require('./data.json');
const PropertyList = require('../../models/propertyList.js');

class viewModel {
  constructor() {
    // The complete property list will not vary since all properties are
    // loaded at once, so it's not necessary to declare an observable for it.
    this.properties = new PropertyList(data);
    this.visibleProperties = ko.observableArray();

    // Reference to Google map is initialized via a custom binding
    this.map = null;
    this.markers = new Map();  // Markers map where the key is the property ID
  }

  /**
   * Update the visibleProperties observable with a new set of visible
   * properties. Components will observe changes on visibleProperties, but
   * will not change it themselves. Instead, updates to visibleProperties will
   * be delegated to this method so it's easier to debug and follow changes.
   * @param {object} filtersObj - filter criteria
   */
  updateProperties(visibleProperties) {
    this.visibleProperties(visibleProperties)
  }

  /**
   * Weighing the cost of scrapping and creating all markers (and their events)
   * each time this method is called vs creating only the markers that hadn't
   * been created before and updating their visibility on the map, we choose to
   * go with the second approach for this method.
   */
  refreshMarkersOnMap() {
    const visibleProperties = new Map();
    const map = this.map;
    const bounds = new google.maps.LatLngBounds();

    // Create a map of all the properties that are visible
    this.visibleProperties().forEach(prop => {
      visibleProperties.set(prop.id, prop);
    });

    // Loop through all the markers
    this.markers.forEach((marker, id) => {
      if (visibleProperties.has(id)) {
        // Remove id from visible properties map since a marker already exists for it
        visibleProperties.delete(id);
        marker.setMap(map);
        bounds.extend(marker.getPosition());
      } else {
        marker.setMap(null);
      }
    })

    // Remaining properties in the map don't have a marker yet, create them
    visibleProperties.forEach((prop, id) => {
      const newMarker = new google.maps.Marker({
            position: prop.coordinates,
            title: prop.project,
            animation: google.maps.Animation.DROP,
            map: map,
            id: id
          });
      bounds.extend(newMarker.getPosition());
      this.markers.set(id, newMarker);
    })

    // Extend the boundaries of the map to be able to view all markers
    map.fitBounds(bounds);
  }

  selectProperty(property) {
    console.info('Property selected: ', property);
  }
}

module.exports = viewModel;
