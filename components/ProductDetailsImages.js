import React from "react";

const ProductDetailsImages = ({ images, setActiveImage }) => {
  if (images.length <= 1) return null;
  return (
    <div className="columns is-multiline">
      {images.map(imagePath => (
        <div
          className="column is-one-quarter"
          key={"imageGallery" + imagePath}
          onClick={() => setActiveImage(imagePath)}
          onMouseEnter={() => setActiveImage(imagePath)}
        >
          <img
            className="img img-responsive"
            src={imagePath}
            style={{ maxWidth: "100%" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsImages;
