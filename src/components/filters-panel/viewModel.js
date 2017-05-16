const ko = require('knockout');
const Property = require('../../js/models/Property.js');

class ViewModel {
  constructor(params) {
    // Observables (read-only)
    this.map = params.map;
    this.properties = params.properties;
    this.visibleProperties = params.visibleProperties;

    // Handlers to modify state
    this.clickHandler = params.clickHandler;
    this.updatePropertiesHandler = params.updatePropertiesHandler;
    this.doneHandler = params.doneHandler;

    // Properties specific to this component's context
    this.propTypeSelected = ko.observable('0');

    this.priceBounds = ko.observableArray();
    this.minPrice = ko.observable();
    this.maxPrice = ko.observable();

    this.areaBounds = ko.observableArray();
    this.minArea = ko.observable();
    this.maxArea = ko.observable();

    // Observable that concentrates all property filters. It will delay its
    // change notifications in order to avoid updating the visible properties
    // list continuously.
    this.propFilters = ko.observable({}).extend({ rateLimit: 150 });

    this.propertyTypes = [{
        value: 0,
        label: 'Choose a property type',
        enable: false
      }].concat(Property.types().map(item => {
        return {
          value: item.value,
          label: item.label,
          enable: true
        }
      }));

    /* --- Explicit subscriptions on observables ---*/
    this.propTypeSelected.subscribe(type => {
      // Whenever the property type changes, the bounds for the range filters
      // must be updated. Changing the bounds will update the range's min and
      // max values, which will in turn update the propFilters observable.
      const priceBounds = this.properties.getRange(type, 'squareMeterSalePrice');
      const areaBounds = this.properties.getRange(type, 'area');
      this.priceBounds(priceBounds);
      this.areaBounds(areaBounds);
    });

    // Whenever any of these filters are updated, the propFilters observable will
    // be updated via the updatePropFilters method
    this.minPrice.subscribe(this.updatePropFilters.bind(this));
    this.maxPrice.subscribe(this.updatePropFilters.bind(this));
    this.minArea.subscribe(this.updatePropFilters.bind(this));
    this.maxArea.subscribe(this.updatePropFilters.bind(this));

    // After the property filters are updated, a new set of visible properties
    // is computed and passed to the handler in charge of updating the
    // visibleProperties value.
    this.propFilters.subscribe(filters => {
      const propertyList = this.properties.filterBy(filters);
      this.updatePropertiesHandler(propertyList)
    })
  }

  updatePropFilters() {
    const type = this.propTypeSelected();
    const minPrice = this.minPrice();
    const maxPrice = this.maxPrice();
    const minArea = this.minArea();
    const maxArea = this.maxArea();

    this.propFilters({
      'type': type,
      'squareMeterSalePrice': [ minPrice, maxPrice ],
      'area': [ minArea, maxArea ]
    });
  }
}

module.exports = ViewModel;
