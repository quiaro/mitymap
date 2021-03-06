const ko = require('knockout');
const data = require('./data.json');
const PropertyList = require('../../js/models/PropertyList.js');

class ViewModel {
  constructor(params) {
    // Did the google API load without errors?
    this.googleApi = params.googleApi;

    // The complete property list will not vary since all properties are
    // loaded at once, so it's not necessary to declare an observable for it.
    this.properties = new PropertyList(data);
    this.visibleProperties = ko.observableArray(this.properties.getAll());
    this.selectedProperty = ko.observable();

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
  refreshMapAndAttachMarkers() {
    const propertiesMap = new Map();
    const map = this.map;
    const bounds = new this.googleApi.maps.LatLngBounds();
    // Array of markers that need to be attached to the map
    const pendingMarkers = [];

    // Create a map of all the properties that are visible
    this.visibleProperties().forEach(prop => {
      propertiesMap.set(prop.id, prop);
    });

    // Loop through all the markers
    this.markers.forEach((marker, id) => {
      if (propertiesMap.has(id)) {
        // Remove id from visible properties map since a marker already
        // exists for it
        propertiesMap.delete(id);
        if (!marker.getMap()) {
          // If the marker isn't attached to the map, add it to the pending
          // markers array
          pendingMarkers.push(marker);
        }
        bounds.extend(marker.getPosition());
      } else {
        marker.setMap(null);
      }
    })

    // Remaining properties in the map don't have a marker yet, create them
    // but don't attach them to the map yet
    propertiesMap.forEach((prop, id) => {
      const self = this;
      const newMarker = new this.googleApi.maps.Marker({
        position: prop.coordinates,
        title: prop.project,
        icon: 'http://maps.google.com/mapfiles/kml/pal5/icon12.png',
        id: id
      });
      // On marker click, select property
      newMarker.addListener('click', function() {
        const property = self.properties.getProperty(this.get('id'));
        self.resetSelectedProperty();
        self.selectProperty(property);
      });
      bounds.extend(newMarker.getPosition());
      this.markers.set(id, newMarker);
      pendingMarkers.push(newMarker);
    })

    // Extend the boundaries of the map to be able to view all markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }

    // Run a delay before showing the markers on the map to give the map
    // some time to re-render.
    setTimeout(() => {
      this.addMarkers(pendingMarkers);
    }, 800);
  }

  /**
   * Attach a list of markers to the map
   * @param {object[]} markers - Array of Marker objects to attach
   */
  addMarkers(markers) {
    const map = this.map;
    markers.forEach(marker => {
      // Cancel the animations on all markers
      marker.setMap(map);
    });
  }

  /**
   * Update selected property cache
   * @param {object} property
   */
  selectProperty(property) {
    this.selectedProperty(property);
    const selectedMarker = this.markers.get(property.id);
    // Add bouncing animation to selected marker
    selectedMarker.setAnimation(this.googleApi.maps.Animation.BOUNCE);
  }

  /**
   * Clear cache on selected property and remove animation from its
   * associated marker.
   */
  resetSelectedProperty() {
    const selectedProperty = this.selectedProperty();
    if (selectedProperty) {
      const selectedMarker = this.markers.get(selectedProperty.id);
      // Remove bouncing animation on the selected marker
      selectedMarker.setAnimation(null);
      this.selectedProperty(null);
    }
  }
}

module.exports = ViewModel;
