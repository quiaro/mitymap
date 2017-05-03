import {helloWorld} from './utils'

helloWorld();

$(document).ready(function() {
  // Initialize collapse button
  $("#sidenav-expand").sideNav({
    menuWidth: 380,
  });

  $('select').material_select();
});
