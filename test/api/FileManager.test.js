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
        });

        it("Should ImportStaticTextFiles", () => {
            let firstLineTextAbout = "# Über uns";
            let aboutIndex = 2; // about.md in array["agbs","about"]
            let texts = FileManager.ImportStaticTextFiles();
            texts.should.have.length(4); 
            let firstLineImported = texts[aboutIndex].content.split("\n")[0];
            expect(firstLineImported).to.include(firstLineTextAbout);
        });
    });
});

function TestSuccessCallback(data) {
    true.should.be.true;
}

function TestErrorCallback(data) {
    true.should.be.false;
}