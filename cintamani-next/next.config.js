const pathToRoutes = "./data/routes.json";

module.exports = {
  exportPathMap: function () {
    var fs = require('fs')

    try {
      var data = fs.readFileSync(pathToRoutes, 'utf8');
      let convertedRoutes = JSON.parse(data);
      return convertedRoutes;
    } catch (e) {
      console.log('Error:', e.stack);
    }
  }
}