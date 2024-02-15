import XLSX from 'xlsx';
import _ from "lodash";

import cellNames from "../data/productsCellNames";

class ImageHelper {

    static fakePicturePath = false;

    static getImagePath(main, side, image) {
        const imagePathFull = "/static/images/products/" + main + "/" + side + "/" + image;
        const imagePathMainOnly = "/static/images/products/" + main + "/" + image;


        if(this.fakePicturePath){
            let testMain = "Buddhas";
            let testSide ="Manjusri";
            let testImage="001.jpg";
            return "/static/images/products/" + testMain + "/" + testSide + "/" + testImage;
        }

        if (side) return imagePathFull;
        if (!side) return imagePathMainOnly;
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
            if (includeCategorySortString){
                if (categories.sideCategory)
                imagesLong.push(this.getImagePath(categories.mainCategory,categories.sideCategory, shortString));
                else 
                imagesLong.push(this.getImagePath(categories.mainCategory, null, shortString));
            }
            else imagesLong.push('/public/static/images/products/' + shortString);
            });

        
        if(this.fakePicturePath){
            let fakeImages = [];
            let testMain = "Buddhas";
            let testSide ="Manjusri";
            let testImage="001.jpg";
            let testImage2="002.jpg";
            fakeImages.push("/public/static/images/products/" + testMain + "/" + testSide + "/" + testImage);
            fakeImages.push("/public/static/images/products/" + testMain + "/" + testSide + "/" + testImage2);
            return fakeImages;
        }

        return imagesLong;
    }

    static getCategories(productDataItem){
        if (productDataItem[cellNames.FriendlyCategoryName]) {
            return {
                mainCategory: _.trim(productDataItem[cellNames.FriendlyCategoryName].split("-")[0]),
                sideCategory: _.trim(productDataItem[cellNames.FriendlyCategoryName].split("-")[1])
            }
        }
        
        return {
            mainCategory: _.trim(productDataItem[cellNames.Category].split("-")[0]),
            sideCategory: _.trim(productDataItem[cellNames.Category].split("-")[1])
        }
    }
}

export default ImageHelper;