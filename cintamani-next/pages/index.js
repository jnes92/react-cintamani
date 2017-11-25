import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import withRedux from 'next-redux-wrapper'
import LazyHero from 'react-lazy-hero';

import Layout from '../components/MyLayout.js'

import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/productsCellNames";

import styles from "../styles/home.css";

class Home extends React.Component {
    static getInitialProps({ store, isServer }) {
        store.dispatch(getProducts(isServer));
    }

    render() {
        return (
            <Layout categories={this.props.categories}>
                <style>
                    {styles}
                </style>
                    <LazyHero
                        className="hero"
                        opacity={0}
                        imageSrc="/static/images/head1_web.jpg">
                        <div className="text-box">
                            <em className="text-headline">Buddhas aus Nepal</em>
                            <h2 className="text-subtitle">seltene Kunstwerke</h2>
                        </div>
                    </LazyHero>
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

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Home)