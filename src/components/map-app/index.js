const ko = require('knockout');
const google = require('googleApi');
const mapStyles = require('./map-styles.json');
const template = require('./template.html');

// Initialize the map on a specific DOM element in the component via a binding
// Per: http://knockoutjs.com/documentation/custom-bindings.html
ko.bindingHandlers.mapSetup = {
  init: function(element) {

    // Constructor creates a new map - only center and zoom are required.
    const map = new google.maps.Map(element, {
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

    var tribeca = {
      lat: 40.719526,
      lng: -74.0089934
    };

    new google.maps.Marker({
      position: tribeca,
      map: map,
      title: 'First Marker!'
    });
  }
};

module.exports = {
  template: template
}
