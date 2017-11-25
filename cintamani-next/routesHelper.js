import _  from "lodash";

import ExcelImporter from "./api/ExcelImporter";
import cellNames from "./data/productsCellNames";


class RoutesHelper{
    static GetDevRoutes(){
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

}

export default RoutesHelper;
