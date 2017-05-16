const ko = require('knockout');
const noUiSlider = require('noUiSlider');
const wNumb = require('wNumb');
const ViewModel = require('./ViewModel.js');
const template = require('./template.html');

ko.bindingHandlers.rangeSetup = {

  init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {
    const rangeAttr = $(element).data('range');
    noUiSlider.create(element, {
      start: [0, 1],
      connect: true,
      step: 1,
      range: {
       'min': 0,
       'max': 1
      },
      format: wNumb({
       decimals: 0
      })
    }).on(`set.${rangeAttr}`, function(values) {
      // Update the observables in the viewModel when the slider values are updated
      // Get viewModel per: http://knockoutjs.com/documentation/custom-bindings.html
      const vmodel = bindingContext.$data;
      vmodel.minValue(values[0]);
      vmodel.maxValue(values[1]);
    })
  },

  update: function(element, valueAccessor) {
    const observable = valueAccessor();
    const bounds = ko.unwrap(observable);

    // When the range bounds change, the filter min and max values are updated
    // along with them
    if (bounds && bounds.length) {
      const rangeMin = bounds[0];
      const rangeMax = bounds[1];

      element.noUiSlider.updateOptions({
        range: {
          'min': rangeMin,
          'max': rangeMax
        }
      });
      element.noUiSlider.set([rangeMin, rangeMax]);
    }
  }
};

module.exports = {
  viewModel: ViewModel,
  template: template
}
