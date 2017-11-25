import _ from "lodash";

import ExcelImporter from "../api/ExcelImporter";
import cellNames from "./productsCellNames";

/*
Should be called only by server once !!
*/
class RoutesHelper {
  routes;
  constructor() {
    this.routes = RoutesHelper.GetDevRoutes();
  }
  static GetDevRoutes() {
    const importedProducts = ExcelImporter.import();
    const flatCategories = ExcelImporter.getFlatCategories(importedProducts);

    // Get Home, Static Routes: index.js
    let routes = {
      '/': { page: '/' },
      /// TODO: Add Static Routes like impressum, etc.
    }

    // Get All Routes for category.js (ProductLists)
    flatCategories.forEach((flatCategory) => {
      let main = _.trim(flatCategory.split("-")[0]);
      let side = _.trim(flatCategory.split("-")[1]);
      let pathName = "/" + main + "/" + side;
      routes[pathName] = {
        page: '/category',
        query: { main, side }
      }
    });

    // GetAllRoutes for product.js (All Products Directlink)
    importedProducts.forEach((product) => {
      let main = _.trim(product[cellNames.Category].split("-")[0]);
      let side = _.trim(product[cellNames.Category].split("-")[1]);
      let id = product[cellNames.ID];
      let pathName = "/" + main + "/" + side + "/" + id;
      routes[pathName] = {
        page: '/product',
        query: { id }
      }
    });

    return routes;
  }

  WriteRoutesToFile(filename, routes = this.routes) {
    const content = JSON.stringify(routes);
    const path = filename;
    var fs = require('fs');

    fs.writeFile(path, content, 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("Updated routes.js");
    });
  }

}

export default RoutesHelper;
