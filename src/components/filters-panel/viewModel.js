const ko = require('knockout');
const Property = require('../../models/property.js')

class viewModel {
  constructor(params) {
    // Observables (read-only)
    this.properties = params.properties;
    this.visibleProperties = params.visibleProperties;

    // Handlers to modify state
    this.clickHandler = params.clickHandler;
    this.updatePropertiesHandler = params.updatePropertiesHandler;

    // Properties specific to this component's context
    this.propTypeSelected = ko.observable('0');
    this.isLocationAnywhere = ko.observable(false);

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
    // When the property type is changed the range filters will be reset
    this.propTypeSelected.subscribe((type) => {
      if (type !== '0') {
        const propertyList = this.properties.filterBy({ 'type': type });
        this.updatePropertiesHandler(propertyList)
      }
    })
  }
}

module.exports = viewModel;
