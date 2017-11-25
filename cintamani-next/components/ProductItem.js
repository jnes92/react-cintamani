import React from 'react'
import cellNames from "../data/productsCellNames";
import _ from "lodash";
import Link from 'next/link'


const ProductItem = ({ article }) => {

  const mainCategory = _.trim(article[cellNames.Category].split("-")[0]);
  const sideCategory = _.trim(article[cellNames.Category].split("-")[1]);

  return (
    <li>
      <Link
        key={"categoriesList_" + mainCategory + "_" + sideCategory+"_"+article[cellNames.ID]}
        as={`/${mainCategory}/${sideCategory}/${article[cellNames.ID]}`}
        href={`/product?id=${article[cellNames.ID]}`}>
        <a>
          <p>
            <span> Name: {article[cellNames.Name]} </span>
            <br />
            <span> Preis: {article[cellNames.Price]} </span>
            <br />
            <span> Images: {article[cellNames.Images]} </span>
            <br />
          </p>
        </a>
      </Link>
    </li>
  )
}

export default ProductItem;