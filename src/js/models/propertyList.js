const Property = require('./Property.js')

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
   * Filter properties by one or more criteria per a filters object.
   * The keys in the filters object must correspond to property attributes.
   * The values can be either primitive values (i.e. string, integer) or they
   * can be arrays made up of two integers.
   * @param {object} criteria - filters object
   * @return {Property[]} - Array of property instances that match the filter criteria
   */
  filterBy(criteria) {
    const clist = Object.keys(criteria);
    return this.properties.filter((property) => {
      let matches = true;
      for (let i = clist.length - 1; i >= 0; i--) {
        const key = clist[i];

        if (criteria[key].constructor === Array) {
          // If the filter value is an array, then the value of the property
          // attribute must be contained within the two values in the array
          // for the property to be selected.
          const lowerLimit = criteria[key][0];
          const upperLimit = criteria[key][1];
          if (property[key] < lowerLimit || property[key] > upperLimit) {
            matches = false;
            break;
          }
        } else {
          // We assume the filter value is a primitive value. The property
          // attribute must be equal to this value for the property to be
          // selected.
          if (property[key] !== criteria[key]) {
            matches = false;
            break;
          }
        }
      }
      return matches;
    })
  }

  /**
   * Get the minimum and maximum values for an attribute for all properties of
   * a certain type.
   * @param {string} type - Property type
   * @param {string} attribute - Property attribute
   * @return {integer[]} - An array where [0] holds the minimum value of all
   *                       attribute values and [1] holds the maximum value of
   *                       all attribute values.
   */
  getRange(type, attribute) {
    const rangeValues = this.properties
      .filter(property => (property['type'] === type && property[attribute]))
      .map(property => property[attribute]);

    return [ Math.min(...rangeValues),
             Math.max(...rangeValues) ];
  }

  /**
   * Find a property by its ID
   * @param {integer} propertyId
   * @return {Property} - Property instance
   */
  getProperty(propertyId) {
    return this.properties.find(property => {
      return property['id'] === propertyId;
    });
  }
}

module.exports = PropertyList;
