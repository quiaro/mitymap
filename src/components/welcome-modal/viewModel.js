const ko = require('knockout');

class ViewModel {
  constructor() {
    const isReturningUser = localStorage.getItem('isReturningUser');
    const isModalOpen = !isReturningUser;
    this.isModalOpen = ko.observable(isModalOpen);
    // User is no longer a new user. Next time the user refreshes
    // he won't be greeted with the welcome message
    localStorage.setItem('isReturningUser', true);
  }
}

module.exports = ViewModel;
