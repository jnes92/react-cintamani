import chai from "chai";

import ImageHelper from "../../api/ImageHelper"

var assert = chai.assert, expect = chai.expect, should = chai.should();


describe('ImageHelper', () => {
    describe('getAllImages', () => {
        let testStrings = ["abc.jpg,123.png, asdf.jpg", "abc.jpg"];
        testStrings.forEach((testString, i) => {
            it("Should return shortname images for case(" + (i+1) + ")", () => {

                let images = ImageHelper.getAllImagesAsShortString(testString);
                images.should.be.a("array");

                if(i == 0){
                    images.should.have.length(3);
                    assert.equal(images[0], "abc.jpg");
                    assert.equal(images[1], "123.png");
                    assert.equal(images[2], "asdf.jpg");
                }
                if (i == 1){
                    images.should.have.length(1);
                    assert.equal(images[0], "abc.jpg");
                }

            });
        });


        it("Should return all images for a product", () => {
            let testString = "abc.jpg,123.png, asdf.jpg";
            let testProduct =
                {
                    Images: testString,
                    __rowNum__: 1, ID: "1", Category: "Buddhas - Aksobhya",
                    Description: "Beschreibung", Name: "Test",
                    Price: "10", Quantity: "1"
                }

            // TODO: Remove FakePicturePath after inserting all imgs.
            ImageHelper.fakePicturePath = false;
            let images = ImageHelper.getAllImages(testProduct, true);
            images.should.be.a("array");
            images.should.have.length(3);

            let pathPrefix = "/static/images/products/Buddhas/Aksobhya/";

            assert.equal(images[0], pathPrefix + "abc.jpg");
            assert.equal(images[1], pathPrefix + "123.png");
            assert.equal(images[2], pathPrefix + "asdf.jpg");
        })

    });
});