const ko = require('knockout');
const Property = require('../../models/property.js')

ko.extenders.filterProperties = function(target, updateFn) {
    target.subscribe(function(newValue) {
      if (newValue !== '0') {
        updateFn({ 'type': newValue });
      }
    });
    return target;
};

class viewModel {
  constructor(params) {
    this.clickHandler = params.clickHandler;
    this.filterPropertiesHandler = params.filterPropertiesHandler;
    this.visibleProperties = params.visibleProperties;

    // Properties specific to this component's context
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
    this.propTypeSelected = ko.observable('0').extend({ filterProperties: this.filterPropertiesHandler });
    this.isLocationAnywhere = ko.observable(false);
  }
}

module.exports = viewModel;
