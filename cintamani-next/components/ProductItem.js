import React from 'react'
import cellNames from "../data/productsCellNames";


const ProductItem = ({ article }) => {
  return (
    <li>
      {/* <Link as={`/p/${article.sku}`} href={`/article?title=${article.name}`}> */}
      {/* <a> */}
      <p>
        <span> ID: {article[cellNames.ID]} </span>
        <br />
        <span> Name: {article[cellNames.Name]} </span>
        <br />
        <span> Category: {article[cellNames.Category]} </span>
        <br />
        <span> Preis: {article[cellNames.Price]} </span>
        <br />

        <span> Menge: {article[cellNames.Quantity]} </span>
        <br />

        <span> Images: {article[cellNames.Images]} </span>
        <br />

      </p>
      {/* </a> */}
      {/* </Link> */}
    </li>
  )
}

export default ProductItem;