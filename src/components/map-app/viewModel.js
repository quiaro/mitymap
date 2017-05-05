const ko = require('knockout');
const data = require('./data.json');

class viewModel {
  constructor() {
    // Initialize properties observable to an empty array
    this.properties = ko.observableArray(data);
    this.visibleProperties = ko.observableArray([ data[0], data[1] ]);
  }
}

module.exports = viewModel;
