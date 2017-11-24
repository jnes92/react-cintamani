import chai from "chai";

import ExcelImporter from "../../api/ExcelImporter"

var assert = chai.assert, expect = chai.expect, should = chai.should();

const actualDataSize = 6;
const actualUniqueGroups = 5;
const testDataPath = "data/products/products_test.xlsx";

describe('ExcelImporter', () => {
  describe('import products.xlsx', () => {
    it("import should be static function", () => {

      let importedData = ExcelImporter.import(testDataPath);
      importedData.should.be.a("array");

      assert.equal(importedData.length, actualDataSize, "Imported all rows of data");
    });

    it("import(path) " + actualDataSize + " products", () => {

      let importedData = ExcelImporter.import(testDataPath);
      importedData.should.be.a("array");

      assert.equal(importedData.length, actualDataSize, "Imported all rows of data");
    });

    it("import defaultData if no args", () => {

      let importedData = ExcelImporter.import();
      importedData.should.be.a("array");
    });

    it("should not import, if duplicates", () => {
      const testDataDuplicates = "data/products/products_test_duplicates.xlsx";

      let importedData = ExcelImporter.import(testDataDuplicates);
      importedData.should.have.length(0);
    });
  });

  describe('getCategories()', () => {
    it("getFlatCategories() : should get all categories as string[]", () => {

      let importedData = ExcelImporter.import(testDataPath);
      let foundCategories = ExcelImporter.getFlatCategories(importedData);

      foundCategories.should.have.length(actualUniqueGroups);
    });

    it("getCategories() : should get all categories with hierarchy", () => {

      let importedData = ExcelImporter.import(testDataPath);
      let foundCategories = ExcelImporter.getCategories(importedData);

      const expectedOutput = [
        {name : "Buddhas", subCategories: ["Aksobhya", "Manjusri"]},
        {name : "Malas", subCategories: ["klein"]},
        {name : "Thangkas", subCategories: ["groß", "klein"]}
      ];

      foundCategories.should.be.deep.equal(expectedOutput);
    });

  })

  describe('Verify Live Data()', () => {
    it("Live data should have no duplicates", () => {
      let importedData = ExcelImporter.import();
      importedData.should.have.length.greaterThan(0);
    });

    describe("Live data should have filled required fields", () => {
      let tableObjectTestData;
      beforeEach(() => {
       tableObjectTestData =
        {
          __rowNum__: 1, ID: "1", Category: "Buddhas - Aksobhya",
          Description: "Beschreibung", Images: "asd.jpg", Name: "Test",
          Price: "10", Quantity: "1"
        }
      })
      
      it("Should be true if row is fine", () => {
        ExcelImporter.verifyLine(tableObjectTestData, 0,true).should.be.true;        
      })
      
      it("Should check for missing ID", () => {
        tableObjectTestData.ID="";
        ExcelImporter.verifyLine(tableObjectTestData, 0,true).should.be.false;                
      })

      it("Should check for missing Category", () => {
        tableObjectTestData.Category="";
        ExcelImporter.verifyLine(tableObjectTestData, 0,true).should.be.false;                
      })

      it("Should check for missing Name", () => {
        tableObjectTestData.Name="";
        ExcelImporter.verifyLine(tableObjectTestData, 0,true).should.be.false;                
      })

      it("Should check for missing Price", () => {
        tableObjectTestData.Price="";
        ExcelImporter.verifyLine(tableObjectTestData, 0,true).should.be.false;                
      })

    });
  })
}); 