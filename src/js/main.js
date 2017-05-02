import {helloWorld} from './utils'

helloWorld();

$(document).ready(function() {
  // Initialize collapse button
  $(".filter-menu-control").sideNav();
  $(".listing-menu-control").sideNav();

  $('select').material_select();
});
