const ko = require('knockout');
const mapApp = require('./components/map-app');

// Register components used in the app
ko.components.register('map-app', mapApp);
