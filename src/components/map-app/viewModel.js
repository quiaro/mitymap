const ko = require('knockout');
const data = require('./data.json');
const PropertyList = require('../../models/propertyList.js');

class viewModel {
  constructor() {
    // The complete property list will not vary since all properties are
    // loaded at once, so it's not necessary to declare an observable for it.
    this.properties = new PropertyList(data);
    this.visibleProperties = ko.observableArray();
  }
}

module.exports = viewModel;
