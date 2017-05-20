const ko = require('knockout');
const mapStyles = require('./map-styles.json');
const ViewModel = require('./ViewModel.js');
const template = require('./template.html');
const mapSideNav = require('../map-sidenav');
const propertyModal = require('../property-modal');

// Register sub-components
ko.components.register('map-sidenav', mapSideNav);
ko.components.register('property-modal', propertyModal);

// Initialize the map on a specific DOM element in the component via a binding
// Per: http://knockoutjs.com/documentation/custom-bindings.html
ko.bindingHandlers.mapSetup = {
  init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {

    // Constructor creates a new map - only center and zoom are required
    // Map reference is saved in the viewModel
    const googleApi = valueAccessor();
    bindingContext.$data.map = new googleApi.maps.Map(element, {
      center: {
        lat: 9.9310584,
        lng: -84.0753899
      },
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: googleApi.maps.MapTypeId.ROADMAP,
      styles: mapStyles
    });
    bindingContext.$data.refreshMapAndAttachMarkers();
  }
};

module.exports = {
  viewModel: ViewModel,
  template: template
}
