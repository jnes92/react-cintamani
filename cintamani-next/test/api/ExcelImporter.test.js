import chai from "chai";

import ExcelImporter from "../../api/ExcelImporter"

var assert=chai.assert, expect = chai.expect, should = chai.should();

const actualDataSize = 2;


describe('ExcelImporter', () => {
  describe('import products.xlsx', () =>  {
    it("import should be static function", () => {

      let importedData = ExcelImporter.import("data/products/products.xlsx");
      importedData.should.be.a("array"); 

      assert.equal(importedData.length, actualDataSize,"Imported all rows of data");
    });

    it("import(path) " + actualDataSize + " products", () => {

      let importedData = ExcelImporter.import("data/products/products.xlsx");
      importedData.should.be.a("array"); 

      assert.equal(importedData.length, actualDataSize,"Imported all rows of data");
    });

    it("import defaultData if no args", () => {
      
      let importedData = ExcelImporter.import();
      importedData.should.be.a("array"); 

      assert.equal(importedData.length, actualDataSize,"Imported all rows of data");
    });
  });
}); 