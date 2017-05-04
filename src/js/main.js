const ko = require('knockout');
const component = require('../component.js');
const googleMap = require('./google-map.js');

ko.components.register('first-component', component);
ko.applyBindings({ userName: 'Tom' });

googleMap.init();

$(document).ready(function() {
  // Initialize collapse button
  $("#sidenav-expand").sideNav({
    menuWidth: 380,
  });

  $('select').material_select();
});
