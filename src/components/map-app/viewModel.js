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
   * Update the visibleProperties observable with a new set of visible
   * properties. Components will observe changes on visibleProperties, but
   * will not change it themselves. Instead, updates to visibleProperties will
   * be delegated to this method so it's easier to debug and follow changes.
   * @param {object} filtersObj - filter criteria
   */
  updateProperties(visibleProperties) {
    this.visibleProperties(visibleProperties)
  }
}

module.exports = viewModel;
