import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import withRedux from 'next-redux-wrapper'

import Layout from '../components/MyLayout.js'


import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/productsCellNames";



class Home extends React.Component {
    static getInitialProps({ store, isServer }) {
        store.dispatch(getProducts(isServer));
    }

    render() {
        return (
            <Layout categories={this.props.categories}>
                <h1>My Shop</h1>
                {this.props.routeList ?
                    <div>
                        <h3> Developer Only </h3>
                        <span> Dont forget to add this to next.config.js </span>
                        <div>
                            {JSON.stringify(this.props.routeList)}
                        </div>
                    </div> : <div></div>}
            </Layout>
        )
    }
}
const mapStateToProps = ({ products, categories, routeList }) => {
    return {
        products,
        categories,
        routeList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: bindActionCreators(getProducts, dispatch),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Home)