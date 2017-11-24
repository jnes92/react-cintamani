import React from 'react'


import Layout from '../components/MyLayout.js'
import Link from 'next/link'

import ArticleItem from '../components/Articles/ArticleItem';

import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/products/productsCellNames";
let test = "../data/products/products_test_duplicates.xlsx";


class Home extends React.Component {
    static async getInitialProps() {
        let excelProducts = ExcelImporter.import();
        let categories = ExcelImporter.getCategories(excelProducts);
        return { excelProducts, categories }
    }

    render() {
        return (
            <Layout categories={this.props.categories}>
                <h1>My Shop</h1>
                <ul>
                    {this.props.excelProducts ?
                        this.props.excelProducts.map((product, index) => (
                            <ArticleItem key={product[cellNames.ID]} article={product} />
                        ))
                        : (<div> Imported dataset is wrong </div>)
                    }
                </ul>
            </Layout>
        )


    }
}

export default Home