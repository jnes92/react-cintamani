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

    static verifyLineColumn() {

    }

    static getFlatCategories(tableObjects) {
        let categories = [];

        tableObjects.forEach(product => {
            let activeCategories = product[cellNames.Category];
            categories.push(activeCategories);
        });

        return _.uniq(categories);
        // _.sortedUniq([1, 1, 2]);
        // _.union([arrays])


        // get all by category ?
        // _.partition(users, function(o) { return o.active; });
    }

    static getCategories(tableObjects) {
        let categories = this.getFlatCategories(tableObjects);

    }

}

export default ExcelImporter;