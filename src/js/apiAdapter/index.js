const apiKeys = require('./apiKeys');

const loadPropertyData = (property) => {
  return new Promise((resolve, reject) => {
    console.info(apiKeys.facebook);
    setTimeout(function() {
      if (property) {
        resolve({
          cover_image: 'https://fb-s-a-a.akamaihd.net/h-ak-fbx/v/t1.0-0/p180x540/22186_1643607169194383_4071659832503055671_n.jpg?oh=e999bac6437f37843fe88722eef07a08&oe=597B1300&__gda__=1504565047_8b006c4e5c5a5619d593496ea120ff63',
          phone: '25091900',
          rating_count: 25,
          overall_rating: 4.5,
          source: 'facebook'
        })
      } else {
        reject('Invalid property value');
      }
    }, 1200);
  });
}

module.exports = {
  loadPropertyData
};
