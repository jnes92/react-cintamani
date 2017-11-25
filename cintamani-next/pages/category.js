import React from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import _ from "lodash";

import Layout from '../components/MyLayout.js'
import ProductList from '../components/ProductList';


import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/products/productsCellNames";



class Category extends React.Component {
    static async getInitialProps(props) {
        console.log(props);
        const { query: { main, side }, store, isServer } = props;
        store.dispatch(getProducts(isServer))        
        return { route: { main, side } }
    }

    render() {
        const { main, side } = this.props.route;
        const filteredProducts = _.filter(this.props.products, (item) => {
            let isMainCat = item[cellNames.Category].includes(main);
            let isSideCat = item[cellNames.Category].includes(side);
            if (isMainCat && isSideCat)
                return item;
        });

        return (
            <Layout categories={this.props.categories}>
                <div>
                    <span> {main} > {side} </span>
                </div>
                <ProductList products={filteredProducts} />
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
export default withRedux(initStore, mapStateToProps,mapDispatchToProps)(Category)