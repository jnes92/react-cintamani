import _ from "lodash";

import FileManager from "../api/FileManager"
import ExcelImporter from "../api/ExcelImporter";
import cellNames from "./productsCellNames";

/*
Should be called only by server once !!
*/
class RoutesHelper {
  static GetRoutes() {
    const importedProducts = ExcelImporter.LoadData();
    const flatCategories = ExcelImporter.getFlatCategories(importedProducts);

    // Get Home, Static Routes: index.js
    let routes = {
      '/': { page: '/' },
      '/agb': { page: '/agb' },
      // '/imprint': { page: '/imprint' },
      '/about': { page: '/about' },
      /// TODO: Add Static Routes like impressum, etc.
    }

    // Get All Routes for category.js (ProductLists)
    flatCategories.forEach((flatCategory) => {
      let main = _.trim(flatCategory.split("-")[0]);
      let side = _.trim(flatCategory.split("-")[1]);
      if (side){
        let pathName = "/" + main + "/" + side;
        routes[pathName] = {
          page: '/category',
          query: { main, side }
        }
      }
      else {
        let pathName = "/" + main;
        routes[pathName] = {
          page: '/category',
          query: { main }
        }

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

  static SaveRoutes(filename, callback) {
    let routes = RoutesHelper.GetRoutes();
    const content = JSON.stringify(routes);

    FileManager.WriteFile(content, filename, 'utf8', callback, () => {
      return console.log(err);      
    })
  }

}

export default RoutesHelper;
