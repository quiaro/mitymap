const ko = require('knockout');
const appViewModel = require('./appViewModel.js')
const component = require('../component.js');
// const googleMap = require('./google-map.js');

// Initial app state
const appConfig = {
  isSidenavOpen: ko.observable(false)
}

ko.components.register('first-component', component);
ko.applyBindings(new appViewModel(appConfig));

// googleMap.init();

// $(document).ready(function() {
  // Initialize collapse button
  // $("#sidenav-expand").sideNav({
  //   menuWidth: 380,
  // });

  // $('select').material_select();
// });
