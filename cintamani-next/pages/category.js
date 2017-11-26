import React from 'react'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import _ from "lodash";
import { Grid, Col, Row } from 'react-styled-flexboxgrid'


import Layout from '../components/MyLayout.js'
import ProductItem from '../components/ProductItem';


import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/productsCellNames";

import productStyles from "../styles/category.css"


class Category extends React.Component {
    static async getInitialProps(props) {
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
                <style> {productStyles} </style>
                <div>
                    <span> {main} > {side} </span>
                </div>
                <Grid fluid>
                    <Row xs md lg>
                        {filteredProducts ?
                            filteredProducts.map((product, index) => (
                                <Col key={product[cellNames.ID]} xs={12} md={6} lg={3}>
                                    <ProductItem article={product} />
                                </Col>
                            ))
                            : (<div> Imported dataset is wrong </div>)
                        }
                    </Row>
                </Grid>
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
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Category)