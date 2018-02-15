import XLSX from 'xlsx';
import _ from "lodash";

import cellNames from "../data/productsCellNames";

class ImageHelper {

    static fakePicturePath = false;

    static getImagePath(main, side, image) {
        const imagePath = "/static/images/products/" + main + "/" + side + "/" + image;


        if(this.fakePicturePath){
            let testMain = "Buddhas";
            let testSide ="Manjusri";
            let testImage="001.jpg";
            return "/static/images/products/" + testMain + "/" + testSide + "/" + testImage;
        }

        return imagePath;
    }

    static getAllImagesAsShortString(imagesString){
        let images = [];
        let singleImageName = imagesString.split(",");
        singleImageName.forEach(singleImage => {
            images.push(_.trim(singleImage));
        });
        return images;
    }

    static getAllImages(productDataItem, includeCategorySortString = false){
        let categories = this.getCategories(productDataItem);
        let imagesShort = this.getAllImagesAsShortString(productDataItem[cellNames.Images]);

        let imagesLong = [];
        imagesShort.forEach((shortString) => {
            if (includeCategorySortString)
                imagesLong.push(this.getImagePath(categories.mainCategory,categories.sideCategory, shortString));
            else imagesLong.push('/static/images/products/' + shortString);
            });

        
        if(this.fakePicturePath){
            let fakeImages = [];
            let testMain = "Buddhas";
            let testSide ="Manjusri";
            let testImage="001.jpg";
            let testImage2="002.jpg";
            fakeImages.push("/static/images/products/" + testMain + "/" + testSide + "/" + testImage);
            fakeImages.push("/static/images/products/" + testMain + "/" + testSide + "/" + testImage2);
            return fakeImages;
        }

        return imagesLong;
    }

    static getCategories(productDataItem){
        const mainCategory = _.trim(productDataItem[cellNames.Category].split("-")[0]);
        const sideCategory = _.trim(productDataItem[cellNames.Category].split("-")[1]);

        return {
            mainCategory, sideCategory
        }
    }
}

export default ImageHelper;