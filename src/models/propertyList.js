const Property = require('./property.js')

/*
 * Model to encapsulate data for a collection of properties
 */
class PropertyList {

  /**
   * Create a new PropertyList instance
   * @param {object[]} - Array of JSON objects with property data
   */
  constructor(data) {
    this.properties = data.map((property) => {
      return new Property(property);
    })
  }

  /**
   * Filter by type
   * @param {string} - type string (e.g. 'house')
   * @return {Property[]} - Array of property instances
   */
  filterByType(type) {
    return this.properties.filter((property) => {
      return property.type === type;
    })
  }
}

module.exports = PropertyList;
