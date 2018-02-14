import chai from "chai";

import ExcelImporter from "../../api/ExcelImporter"
import FileManager from "../../api/FileManager"
import RoutesHelper from "../../data/routesHelper";

var assert = chai.assert, expect = chai.expect, should = chai.should();

const actualDataSize = 4;
const actualUniqueGroups = 4;
const testDataPath = "./test/data/products_test.xlsx";


describe('ExcelImporter', () => {
  describe('import products.xlsx', () => {
    it("import(path) " + actualDataSize + " products", () => {
      let importedData = ExcelImporter.import(testDataPath,true);
      importedData.should.be.a("array");

      assert.equal(importedData.length, actualDataSize, "Imported all rows of data");
    });

    // it("import defaultData if no args", () => {
    //   let importedData = ExcelImporter.LoadData();
    //   importedData.should.be.a("array");
    // });

    it("should not import, if duplicates", () => {
      const testDataDuplicates = "./test/data/products_test_duplicates.xlsx";

      let importedData = ExcelImporter.import(testDataDuplicates,true);
      importedData.should.have.length(0);
    });
  });

  describe('getCategories()', () => {
    it("getFlatCategories() : should get all categories as string[]", () => {

      let importedData = ExcelImporter.import(testDataPath,true);
      let foundCategories = ExcelImporter.getFlatCategories(importedData);

      foundCategories.should.have.length(actualUniqueGroups);
    });

    it("getCategories() : should get all categories with hierarchy", () => {

      let importedData = ExcelImporter.import(testDataPath);
      let foundCategories = ExcelImporter.getCategories(importedData);

      const expectedOutput = [
        { name: "Buddhas", subCategories: ["Aksobhya", "Shakyamuni"] },
        { name: "Malas", subCategories: ["Arm Mala"] },
        { name: "Thangkas", subCategories: ["Big Tsagil"] }
      ];

      foundCategories.should.be.deep.equal(expectedOutput);
    });

  })

  // describe('Verify Live Data()', () => {
  //   it("Live data should have no duplicates", () => {
  //     let importedData = ExcelImporter.LoadData();
  //     importedData.should.have.length.greaterThan(0);
  //   });

  //   describe("Live data should have filled required fields", () => {
  //     let tableObjectTestData;
  //     beforeEach(() => {
  //       tableObjectTestData =
  //         {
  //           __rowNum__: 1, ID: "1", Category: "Buddhas - Aksobhya",
  //           Description: "Beschreibung", Images: "001.jpg", Name: "Test",
  //           Price: "10", Quantity: "1"
  //         }
  //     })

  //     it("Should be true if row is fine", () => {
  //       ExcelImporter.verifyLine(tableObjectTestData, 0, true).should.be.true;
  //     })

  //     it("Should check for missing ID", () => {
  //       tableObjectTestData.ID = "";
  //       ExcelImporter.verifyLine(tableObjectTestData, 0, true).should.be.false;
  //     })

  //     it("Should check for missing Category", () => {
  //       tableObjectTestData.Category = "";
  //       ExcelImporter.verifyLine(tableObjectTestData, 0, true).should.be.false;
  //     })

  //     it("Should check for missing Name", () => {
  //       tableObjectTestData.Name = "";
  //       ExcelImporter.verifyLine(tableObjectTestData, 0, true).should.be.false;
  //     })

  //     it("Should check for missing Price", () => {
  //       tableObjectTestData.Price = "";
  //       ExcelImporter.verifyLine(tableObjectTestData, 0, true).should.be.false;
  //     })

  //     it("Should check for missing Image // incorrect path", () => {
  //       tableObjectTestData.Images = "";
  //       ExcelImporter.verifyLineImage(tableObjectTestData, true).should.be.false;
        
  //       tableObjectTestData.Images = "001.JPG";
  //       ExcelImporter.verifyLineImage(tableObjectTestData, true).should.be.true;
  //       debugger;
        
  //       tableObjectTestData.Images = "notexisting.JPG";
  //       ExcelImporter.verifyLineImage(tableObjectTestData,  true).should.be.false;
  //     })

  //     it("Should have routes for live system", () => {
  //       let pathToRoutes = "./data/routes.json";
  //       FileManager.ReadFile(pathToRoutes, 'utf8',
  //         (success) => {
  //           expect(success).to.exist;
  //         }, (error) => {
  //           RoutesHelper.SaveRoutes(pathToRoutes, () => {
  //             FileManager.ReadFile(pathToRoutes, 'utf8',
  //               (success) => {
  //                 expect(success).to.exist;
  //               }, (error) => {
  //                 true.should.be.false;
  //               }, true);
  //           });
  //         }, true);
  //     });

  //     it("Should get data from dropbox folder", () => {
  //       ExcelImporter.importDropbox(() => console.log("Dropbox imported"));
  //     });

  //   });
  // })
});