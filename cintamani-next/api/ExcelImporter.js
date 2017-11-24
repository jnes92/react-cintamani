import XLSX from 'xlsx';
import _ from "lodash";

import cellNames from "../data/products/productsCellNames";

class ExcelImporter {
    static import(path = "data/products/products.xlsx") {
        let workbook = XLSX.readFile(path);

        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let tableObjects = XLSX.utils.sheet_to_json(worksheet);



        if (this.verifyCompleteData(tableObjects))
            return tableObjects;
        else return [];
    }

    static verifyCompleteData(tableObjects) {
        // check for duplicates.
        let importedRows = tableObjects.length;
        let uniqRows = _.uniqBy(tableObjects, cellNames.ID).length;
        let noDuplicateData = importedRows == uniqRows;

        let diff = _.difference(tableObjects, _.uniqBy(tableObjects, cellNames.ID));
        if (diff.length > 0)
            console.error("Error, found duplicate ID: " + _.first(diff)[cellNames.ID]);

        let noMissingFields = true;
        // check single lines
        tableObjects.forEach((product, index) => {
            noMissingFields &= this.verifyLine(product, index);
        })

        return noDuplicateData && noMissingFields;
    }

    static verifyLine(tableObjectRow, index, testFlag = false) {
        let errorsInLine = 0;
        let keyCells = _.keys(cellNames);
        // Dont verify Image, Description, Quantity
        let verifyCells = _.without(keyCells, cellNames.Images, cellNames.Description, cellNames.Quantity);

        verifyCells.forEach(cellToVerify => {
            if (!tableObjectRow[cellToVerify]) {
                if (!testFlag) console.error("Error, product in line " + (index + 1) + " has invalid " + cellToVerify);
                errorsInLine++;
            }
        });

        if (errorsInLine == 0) return true;
        else return false;
    }

    static getFlatCategories(tableObjects) {
        let categories = [];

        tableObjects.forEach(product => {
            let activeCategories = product[cellNames.Category];
            categories.push(activeCategories);
        });

        return _.sortBy(_.uniq(categories));
        
        // get all by category ?
        // _.partition(users, function(o) { return o.active; });
    }

    static getCategories(tableObjects) {
        let categories = [];
        let flatCategories = this.getFlatCategories(tableObjects);

        flatCategories.forEach(singleCategoryLine => {
            let catSplit = singleCategoryLine.split("-");
            let mainCategory = _.trim(catSplit[0]);
            let sideCategory = (catSplit.length > 1) ? _.trim(catSplit[1]) : "";

            let activeSubTree = _.find(categories, (obj) => { return obj.name == mainCategory }) ;
            if (!activeSubTree){
               activeSubTree = { name: mainCategory }   
               activeSubTree.subCategories = [sideCategory];
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