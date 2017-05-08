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

  /**
   * Update the visibleProperties observable with the filter parameters passed.
   * Components will observe changes on visibleProperties, but will not change it
   * themselves. Instead, updates to visibleProperties will be delegated to this
   * method so that it's easier to follow changes made to visibleProperties.
   * @param {object} filtersObj - filter criteria
   */
  filterProperties(filtersObj) {
    this.visibleProperties(this.properties.filterBy(filtersObj))
  }
}

module.exports = viewModel;
