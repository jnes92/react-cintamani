module.exports = {
  exportPathMap: function () {
    let routes = {
      '/': { page: '/' },
    }
    let routesJSON = '{"/":{"page":"/"},"/Buddhas/Aksobhya":{"page":"/category","query":{"main":"Buddhas","side":"Aksobhya"}},"/Buddhas/Manjusri":{"page":"/category","query":{"main":"Buddhas","side":"Manjusri"}},"/Malas/klein":{"page":"/category","query":{"main":"Malas","side":"klein"}},"/Thangkas/groß":{"page":"/category","query":{"main":"Thangkas","side":"groß"}},"/Thangkas/klein":{"page":"/category","query":{"main":"Thangkas","side":"klein"}}}';
    let convertedRoutes = JSON.parse(routesJSON);
    return convertedRoutes;
  }
}