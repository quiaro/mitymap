const ko = require('knockout');

class ViewModel {
  constructor(params) {
    // Observables (read-only)
    this.visibleProperties = params.visibleProperties;

    // Handlers
    this.onClose = params.onClose;
    this.doneHandler = params.doneHandler;
    this.onSelectProperty = params.onSelectProperty;

    // Properties specific to this component's context
    this.sortAttribute = ko.observable('project');
    this.sortAscending = ko.observable(true);
    this.sortedProperties = ko.pureComputed(function() {
      const properties = this.visibleProperties();
      const attribute = this.sortAttribute();
      const sortOrder =  this.sortAscending() ? 1 : -1;

      return properties.sort((a, b) => {
        if (typeof a[attribute] === 'string') {
          // If comparing strings, then make the strings uppercase before
          // comparing them
          var stringA = a[attribute].toUpperCase();
          var stringB = b[attribute].toUpperCase();
          return (stringA < stringB) ? -1 * sortOrder : 1 * sortOrder;
        } else {
          return (a[attribute] - b[attribute]) * sortOrder;
        }
      })
    }, this);
  }

  sortBy(attribute) {
    if (this.sortAttribute() === attribute) {
      // Table is already sorted on the attribute, then only reverse the sort order
      const order = this.sortAscending() ? false : true;
      this.sortAscending(order);
    } else {
      this.sortAttribute(attribute)
          .sortAscending(true);
    }
  }

  selectProperty(property) {
    this.onClose();
    this.onSelectProperty(property);
  }
}

module.exports = ViewModel;
