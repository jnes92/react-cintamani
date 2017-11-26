import React from 'react'
import _ from "lodash";
import Link from 'next/link'

import cellNames from "../data/productsCellNames";
import ImageHelper from "../api/ImageHelper";

const ProductItem = ({ article }) => {

  const mainCategory = _.trim(article[cellNames.Category].split("-")[0]);
  const sideCategory = _.trim(article[cellNames.Category].split("-")[1]);

  const firstImage = article[cellNames.Images];

  const imagePath = ImageHelper.getImagePath(mainCategory, sideCategory, firstImage);

  return (
    <Link
      key={"categoriesList_" + mainCategory + "_" + sideCategory + "_" + article[cellNames.ID]}
      as={`/${mainCategory}/${sideCategory}/${article[cellNames.ID]}`}
      href={`/product?id=${article[cellNames.ID]}`}>


      <div className="product">
        <div className="image" >
          <img className="img img-responsive" src={imagePath} width="100%" />
        </div>
        <div className="text">
          <h3>           <a>
            {article[cellNames.Name]}       </a> </h3>
          <p className="price">{article[cellNames.Price]} €</p>
          <p className="buttons">

            <a className="btn btn-default">Details</a>
            {/* <a href="shop-basket.html" className="btn btn-template-main"><i className="fa fa-shopping-cart"></i>Add to cart</a> */}
          </p>

        </div>
      </div>

    </Link>



  )
}

export default ProductItem;