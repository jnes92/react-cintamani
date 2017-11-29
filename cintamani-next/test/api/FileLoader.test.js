import chai from "chai";

import FileManager from "../../api/FileManager"

var assert = chai.assert, expect = chai.expect, should = chai.should();

let testFile = "SimpleString inside .txt";
let testPath = "./test/data/FileLoader-write.txt";

describe('FileManager', () => {
    it("Should be able to write a file", () => {
        FileManager.WriteFile(testFile,testPath, TestSuccessCallback , TestErrorCallback);
    })

    it("Should be able to read a file", () => {
        FileManager.ReadFile(testPath, "utf8", TestSuccessCallback , TestErrorCallback);
    })



});

function TestSuccessCallback(data){
    true.should.be.true;
}

function TestErrorCallback(data){
    true.should.be.false;
}