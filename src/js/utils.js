const wNumb = require('wNumb');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * If an address is made up of three parts (e.g. Town, City, Province), the
 * function will return a string with 'City, Province'. If an address only has
 * two parts, the function will return the same string.
 * @param {string} address
 * @return {string}
 */
const trimAddress = (address) => {
  const parts = address.split(",");
  if (parts.length === 3) {
    return parts[1].trim() + ', ' + parts[2].trim();
  } else {
    return address;
  }
}

const moneyFormat = wNumb({
	mark: '.',
	thousand: ',',
	prefix: '$'
});

module.exports = {
  capitalizeFirstLetter,
  trimAddress,
  moneyFormat
};
