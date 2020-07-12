import React from 'react'
import { getProducts } from '../store'
import {connect} from "react-redux";
import _ from "lodash";

import Layout from '../components/MyLayout.js'
import ProductItem from '../components/ProductItem';
import cellNames from "../data/productsCellNames";
import productStyles from "../styles/category.css"

class Category extends React.Component {
    static getInitialProps(props) {
        const { query: { main, side }, store, isServer } = props;
        store.dispatch(getProducts(isServer))
        return { route: { main, side } }
    }

    render() {
        const { main, side } = this.props.route;
        const filteredProducts = _.filter(this.props.products, (item) => {
            let isMainCat = item[cellNames.Category].includes(main);
            let isSideCat = item[cellNames.Category].includes(side);
            if ((isMainCat && isSideCat) || (isMainCat && !side))
                return item;
        });

        return (
            <Layout>
                <style> {productStyles} </style>
                <div className="container">
                    <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="#">{main}</a></li>
                            <li className="is-active"><a href="#" aria-current="page">{side}</a></li>
                        </ul>
                    </nav>

                    <div className="columns is-multiline">
                        {filteredProducts ?
                            filteredProducts.map((product, index) => (
                                <div className="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
                                    <ProductItem key={"productitem_"+index} article={product} />
                                </div>
                            ))
                            : (<div> Imported dataset is wrong </div>)
                        }
                    </div>
                </div>
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
export default connect(mapStateToProps)(Category)