import XLSX from 'xlsx';


class ExcelImporter {
    static import(path = "data/products/products.xlsx") {
        let workbook = XLSX.readFile(path);

        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let tableObjects = XLSX.utils.sheet_to_json(worksheet);

        return tableObjects;
    }
}

export default ExcelImporter;