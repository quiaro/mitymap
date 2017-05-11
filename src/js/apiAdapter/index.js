const apiKeys = require('./apiKeys');

const loadPropertyData = (property) => {
  return new Promise((resolve, reject) => {
    if (property) {
      console.info(apiKeys.facebook);
      resolve(true);
    } else {
      reject('Invalid property');
    }
  })
}

module.exports = {
  loadPropertyData
};
