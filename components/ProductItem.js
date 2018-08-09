import React from 'react'
import _ from "lodash";
import Link from 'next/link'

import cellNames from "../data/productsCellNames";
import ImageHelper from "../api/ImageHelper";

const ProductItem = ({ article }) => {

  const previewImage = ImageHelper.getAllImages(article,true)[0];
  const categories = ImageHelper.getCategories(article);
  let linkQueryAs = categories.sideCategory ? `/${categories.mainCategory}/${categories.sideCategory}/${article[cellNames.ID]}`: `/${categories.mainCategory}/${article[cellNames.ID]}`;

  return (
    <Link
      key={"categoriesList_" + categories.mainCategory + "_" + categories.sideCategory + "_" + article[cellNames.ID]}
      as={linkQueryAs}
      href={`/product?id=${article[cellNames.ID]}`}>


      <div className="product">
        <div className="image" >
          <img className="img img-responsive" src={previewImage} width="100%" />
        </div>
        <div className="text">
          <h3>           <a>
            {article[cellNames.Name]}       </a> </h3>
          <p className="price">{article[cellNames.Price]} </p>
          <p className="buttons">

            <a className="btn btn-default">Details</a>
          </p>

        </div>
      </div>

    </Link>



  )
}

export default ProductItem;