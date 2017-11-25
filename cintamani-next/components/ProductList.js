

import React from 'react'
import ProductItem from './ProductItem';
import cellNames from "../data/products/productsCellNames";


const ProductsList = ({ products }) => {
    return (
        <ul>
            {products ?
                products.map((product, index) => (
                    <ProductItem key={product[cellNames.ID]} article={product} />
                ))
                : (<div> Imported dataset is wrong </div>)
            }
        </ul>
    )
}

export default ProductsList;