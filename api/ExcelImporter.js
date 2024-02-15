import XLSX from 'xlsx';
import _ from "lodash";

import cellNames from "../data/productsCellNames";
import FileManager from "./FileManager"
import ImageHelper from "./ImageHelper"

class ExcelImporter {
    static locPath = './data/products.xlsx';
    static dbLocalPath = './data/products-db.xlsx';
    static dbPath = '/Develop/cintamani/products.xlsx';

    static LoadData(testFlag = false) {
        let dev = process.env.NODE_ENV !== 'production'
        if (FileManager.isDropboxEnabled)
            this.importDropbox(() => {
                return this.import(path);
            });
        let path = (dev || !FileManager.isDropboxEnabled) ? "data/products.xlsx" : "data/products-db.xlsx";
        return this.import(path, testFlag);
    }

    static import(path = "data/products.xlsx", testFlag = false) {
        let workbook = XLSX.readFile(path);
        return this.convert(workbook, testFlag);
    }

    static convert(workbook, testFlag = false) {
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let tableObjects = XLSX.utils.sheet_to_json(worksheet);

        return this.verifyCompleteData(tableObjects, testFlag);
    }

    static checkForDuplicates(tableObjects, testFlag) {
        let importedRows = tableObjects.length;
        let uniqRows = _.uniqBy(tableObjects, cellNames.ID).length;
        let noDuplicateData = importedRows == uniqRows;

        let diff = _.difference(tableObjects, _.uniqBy(tableObjects, cellNames.ID));
        if (diff.length > 0 && !testFlag)
            console.error("Error, found duplicate ID: " + _.first(diff)[cellNames.ID]);

        return noDuplicateData;
    }

    static verifyCompleteData(tableObjects, testFlag = false) {

        let noDuplicateData = this.checkForDuplicates(tableObjects, testFlag);
        let workingProducts = [];

        tableObjects.forEach((to, index) => {
            if (this.verifyLine(to, index, testFlag))
                workingProducts.push(to);
            else {
                console.log("Error found: Not including in build: ", to[cellNames.ID] + " " + to [cellNames.Name]);
            }
        })

        return noDuplicateData ? workingProducts : [];
    }

    static verifyLine(tableObjectRow, index, testFlag = false) {
        let errorsInLine = 0;
        let keyCells = _.keys(cellNames);
        // Dont verify Image, Description, Quantity
        let verifyCells = _.without(keyCells, cellNames.Images, cellNames.Description, cellNames.Quantity, cellNames.FriendlyCategoryName);
    
        verifyCells.forEach(cellToVerify => {
            if (!tableObjectRow[cellToVerify]) {
                if (!testFlag) console.error("Error, product in line " + (index + 1) + " has invalid " + cellToVerify);
                errorsInLine++;
            }
        });

        // if (!this.verifyLineImage(tableObjectRow, testFlag)) {
        //     if (!testFlag) console.error("Error, product in line " + (index + 1) + " has invalid Image");
        //     errorsInLine++;
        // }

        // if (tableObjectRow[cellNames.Quantity] === '0'){
        //     console.warn("Warning, product in line " + (index + 1 ) + " is not in Stock." );
        // }

        if (errorsInLine == 0) return true;
        else {
            return false;
        }
    }

    static verifyLineImage(tableObjectRow, testFlag) {
        let fs = require('fs')

        if (tableObjectRow[cellNames.Images]) {
            let images = ImageHelper.getAllImages(tableObjectRow, true);
            let imagesFound = 0;
            images.forEach((imagePath) => {
                let fstats = fs.existsSync('.' + imagePath);
                if (fstats)
                    imagesFound++;
                else console.error(imagePath);
            })
            if (images.length === imagesFound)
                return true;
            else return false;
        }
        else return false;
    }

    static getFlatCategories(tableObjects) {
        let categories = [];
        if (tableObjects)
            tableObjects.forEach(product => {
                let activeCategories = product[cellNames.Category];
                categories.push(activeCategories);
            });

        return _.sortBy(_.uniq(categories));
    }

    static getCategories(tableObjects) {
        let categories = [];
        let flatCategories = this.getFlatCategories(tableObjects);

        flatCategories.forEach(singleCategoryLine => {
            let catSplit = singleCategoryLine.split("-");
            let mainCategory = _.trim(catSplit[0]);
            let sideCategory = (catSplit.length > 1) ? _.trim(catSplit[1]) : null;

            let activeSubTree = _.find(categories, (obj) => { return obj.name == mainCategory });
            if (!activeSubTree) {
                activeSubTree = { name: mainCategory }
                if (sideCategory) { activeSubTree.subCategories = [sideCategory]; }
                categories.push(activeSubTree);
            }
            else {
                activeSubTree.subCategories.push(sideCategory)
            }
        });
        return (categories);
    }

}

export default ExcelImporter;