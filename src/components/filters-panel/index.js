const ko = require('knockout');
const noUiSlider = require('noUiSlider');
const wNumb = require('wNumb');
const viewModel = require('./viewModel.js');
const template = require('./template.html');

ko.bindingHandlers.selectSetup = {
  init: (element) =>  {
    $(element).material_select();
  }
};

ko.bindingHandlers.rangeSetup = {
  init: (element) =>  {
    noUiSlider.create(element, {
     start: [20, 80],
     connect: true,
     step: 1,
     range: {
       'min': 0,
       'max': 100
     },
     format: wNumb({
       decimals: 0
     })
    });
  }
};

module.exports = {
  viewModel: viewModel,
  template: template
}
