const ko = require('knockout');
const mapApp = require('./components/map-app');
const welcomeModal = require('./components/welcome-modal');

// Register components used in the app
ko.components.register('map-app', mapApp);
ko.components.register('welcome-modal', welcomeModal);

// Start bindings in app
ko.applyBindings({}, document.getElementById('app'));
