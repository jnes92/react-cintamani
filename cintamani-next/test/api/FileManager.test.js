import chai from "chai";

import FileManager from "../../api/FileManager"

var assert = chai.assert, expect = chai.expect, should = chai.should();


describe('FileManager', () => {
    describe('Write/Read', () => {
        let testFile = "SimpleString inside .txt";
        let testPath = "./test/data/FileLoader-write.txt";

        it("Should be able to write a file", () => {
            FileManager.WriteFile(testFile, testPath, "utf8", () => {
                // it("Should be able to read a file")
                FileManager.ReadFile(testPath, "utf8", TestSuccessCallback, TestErrorCallback);
            }, TestErrorCallback);
        })
    });
    describe('Online Services', () => {
        let dbPath = '/Develop/cintamani/products.xlsx';
        let locPath = "./test/data/FileLoader-donwload.xlsx";
        

        it("Should be able to download a file from dropbox", () => {
            FileManager.DownloadFile(dbPath,locPath, "binary" , TestSuccessCallback, TestErrorCallback);
        })
    });
});

function TestSuccessCallback(data) {
    true.should.be.true;
}

function TestErrorCallback(data) {
    true.should.be.false;
}