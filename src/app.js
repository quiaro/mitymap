const ko = require('knockout');
const mapApp = require('./components/map-app');
const mapSideNav = require('./components/map-sidenav');
const filtersPanel = require('./components/filters-panel');

// Register components to be used in the app
ko.components.register('map-app', mapApp);
ko.components.register('map-sidenav', mapSideNav);
ko.components.register('filters-panel', filtersPanel);

// Start bindings in app
ko.applyBindings({}, document.getElementById('app'));
