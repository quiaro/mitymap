const ko = require('knockout');
const mapApp = require('./components/map-app');
const mapSideNav = require('./components/map-sidenav');

// Register components to be used in the app
ko.components.register('map-app', mapApp);
ko.components.register('map-sidenav', mapSideNav);

// Start bindings in app
ko.applyBindings({}, document.getElementById('app'));
