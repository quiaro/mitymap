const { TYPE_APARTMENT, TYPE_HOUSE, TYPE_LOT } = require('../constants.js');

/*
 * Model to encapsulate data for a property
 */
class Property {

  /**
   * Create a new Property instance
   * @param {object} - JSON object with property data
   */
  constructor(property) {
    this.id = property.id;
    this.project = property.project;
    this.type = property.type;
    this.address = property.glg_address;
    this.coordinates = property.coordinates;
    this.builtSM = property.built_sm;
    this.lotSM = property.lot_sm;
    this.bathrooms = property.bathrooms;
    this.bedrooms = property.bedrooms;
    this.rentalPrice = property.rental_price;
    this.salePrice = property.sale_price;
  }

  /**
   * Area in square meters.
   * @return {integer} - Returns the lot area if available;
   *                     if not, the construction area; if not, -1;
   */
  get area() {
    return this.lotSM || this.builtSM || -1;
  }

  /**
   * Is this propety a lot?
   * @return {boolean} - Returns true if the property is a lot
   */
  get isLot() {
    return this.type === TYPE_LOT;
  }

  /**
   * Price per square meter of rental price.
   * @return {integer} - -1 if the value cannot be computed
   */
  get squareMeterRentalPrice() {
    if (!this.rentalPrice || !this.area) {
      return null;
    }
    return Math.round(this.rentalPrice / this.area);
  }

  /**
   * Price per square meter of sale price.
   * @return {integer} - -1 if the value cannot be computed
   */
  get squareMeterSalePrice() {
    if (!this.salePrice || !this.area) {
      return null;
    }
    return Math.round(this.salePrice / this.area);
  }

  /**
   * List of available property types
   * @return {string[]}
   */
  static types() {
    return [{
      value: TYPE_APARTMENT,
      label: 'Apartment'
    }, {
      value: TYPE_HOUSE,
      label: 'House'
    }, {
      value: TYPE_LOT,
      label: 'Lot'
    }];
  }
}

module.exports = Property;
