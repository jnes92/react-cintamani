import React from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import _ from "lodash";

import Layout from '../components/MyLayout.js'
import ProductDetails from '../components/ProductDetails';


import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/productsCellNames";



class Product extends React.Component {
    static async getInitialProps(props) {
        const { query: { id }, store, isServer } = props;
        store.dispatch(getProducts(isServer))
        return { route: { id } }
    }

    render() {
        const { id } = this.props.route;
        const chosenProduct = _.first(_.filter(this.props.products, (item) => {
            if (item[cellNames.ID] == id.toString())
                return item;
        }));
        
        const mainCategory = _.trim(chosenProduct[cellNames.Category].split("-")[0]);
        const sideCategory = _.trim(chosenProduct[cellNames.Category].split("-")[1]);

        return (
            <Layout categories={this.props.categories}>
                <div>
                    <span> {mainCategory} > {sideCategory} </span>
                </div>
                <ProductDetails product={chosenProduct} />
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
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Product)