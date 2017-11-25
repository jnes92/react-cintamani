import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import withRedux from 'next-redux-wrapper'

import Layout from '../components/MyLayout.js'

import ProductList from '../components/ProductList';

import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/products/productsCellNames";



class Home extends React.Component {
    // static async getInitialProps() {
    //     let excelProducts = ExcelImporter.import();
    //     let categories = ExcelImporter.getCategories(excelProducts);
    //     return { excelProducts, categories }
    // }

    static getInitialProps({ store, isServer }) {
        store.dispatch(getProducts(isServer))

    }

    render() {
        return (
            <Layout categories={this.props.categories}>
                <h1>My Shop</h1>
                <ProductList products={this.props.products} />
            </Layout>
        )


    }
}
const mapStateToProps = ({ products, categories }) => {
    return {
        products,
        categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: bindActionCreators(getProducts, dispatch),
    }
}

export default withRedux(initStore, mapStateToProps)(Home)