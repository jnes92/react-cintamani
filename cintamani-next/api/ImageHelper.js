import XLSX from 'xlsx';
import _ from "lodash";

import cellNames from "../data/productsCellNames";

class ImageHelper {
    static getImagePath(main, side, image) {
        const imagePath = "/static/images/products/" + main + "/" + side + "/" + image;

        let testMain = "Buddhas";
        let testSide ="Manjusri";
        let testImage="001.jpg";
        return "/static/images/products/" + testMain + "/" + testSide + "/" + testImage;

        // return imagePath;
    }
}

export default ImageHelper;