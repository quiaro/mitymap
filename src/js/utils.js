const wNumb = require('wNumb');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const moneyFormat = wNumb({
	mark: '.',
	thousand: ',',
	prefix: '$'
});

module.exports = {
  capitalizeFirstLetter,
  moneyFormat
};
