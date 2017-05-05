const ko = require('knockout');
const google = require('googleApi');
const mapStyles = require('./map-styles.json');
const viewModel = require('./viewModel.js');
const template = require('./template.html');
let map;

// Initialize the map on a specific DOM element in the component via a binding
// Per: http://knockoutjs.com/documentation/custom-bindings.html
ko.bindingHandlers.mapSetup = {
  init: function(element) {

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(element, {
      center: {
        lat: 9.9310584,
        lng: -84.0753899
      },
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyles
    });
  },
  update: (element, valueAccessor) => {
    const observable = valueAccessor();
    const properties = ko.unwrap(observable);
    properties.forEach((property) => {
      new google.maps.Marker({
        position: property.coordinates,
        map: map,
        title: 'First Marker!'
      });
    })
  }
};

module.exports = {
  viewModel: viewModel,
  template: template
}
