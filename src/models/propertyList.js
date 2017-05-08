const Property = require('./property.js')

/*
 * Model to encapsulate data for a collection of properties
 */
class PropertyList {

  /**
   * Create a new PropertyList instance
   * @param {object[]} data - Array of JSON objects with property data
   */
  constructor(data) {
    this.properties = data.map((property) => {
      return new Property(property);
    })
  }

  /**
   * Filter by one or more criteria per a filters object
   * @param {object} criteria - filters object
   * @return {Property[]} - Array of property instances that match the filter criteria
   */
  filterBy(criteria) {
    const clist = Object.keys(criteria);
    return this.properties.filter((property) => {
      let matches = true;
      for (let i = clist.length - 1; i >= 0; i--) {
        const key = clist[i];
        if (property[key] !== criteria[key]) {
          matches = false;
          break;
        }
      }
      return matches;
    })
  }
}

module.exports = PropertyList;
