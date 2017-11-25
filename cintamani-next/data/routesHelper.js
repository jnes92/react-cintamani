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

    let routes = {
      '/': { page: '/' },
    }

    flatCategories.forEach((flatCategory) => {
      let main = _.trim(flatCategory.split("-")[0]);
      let side = _.trim(flatCategory.split("-")[1]);
      let pathName = "/" + main + "/" + side;
      routes[pathName] = {
        page: '/category',
        query: { main, side }
      }
    });
    return routes;
  }

  WriteRoutesToFile(filename, routes = this.routes) {
    const content = JSON.stringify(routes);
    console.log(content);
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
