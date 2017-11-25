import React from 'react'
import cellNames from "../data/productsCellNames";


const ProductDetails = ({ product }) => {
  return (
    <div>

      <p>
        <span> ID: {product[cellNames.ID]} </span>
        <br />
        <span> Name: {product[cellNames.Name]} </span>
        <br />
        <span> Category: {product[cellNames.Category]} </span>
        <br />
        <span> Preis: {product[cellNames.Price]} </span>
        <br />

        <span> Menge: {product[cellNames.Quantity]} </span>
        <br />

        <span> Images: {product[cellNames.Images]} </span>
        <br />

      </p>

    </div>
  )
}

export default ProductDetails;