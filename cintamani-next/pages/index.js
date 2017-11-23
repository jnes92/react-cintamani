import React from 'react'


import Layout from '../components/MyLayout.js'
import Link from 'next/link'

import ArticleItem from '../components/Articles/ArticleItem';

import ExcelImporter from "../api/ExcelImporter";

class Home extends React.Component {
    static async getInitialProps() {
        let excelProducts = ExcelImporter.import();
        return {excelProducts}
    }

    render() {
        return (
            <Layout>
            <h1>My Shop</h1>
            <ul>
                {this.props.excelProducts.map((product, index) => (
                    <ArticleItem key={product.ID} article={product} />
                ))}
            </ul>
        </Layout>
        )

        
    }
}

export default Home