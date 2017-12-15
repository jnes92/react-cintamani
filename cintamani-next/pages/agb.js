import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, getProducts } from '../store'
import withRedux from 'next-redux-wrapper'
import LazyHero from 'react-lazy-hero';
import _ from 'lodash';

import Layout from '../components/MyLayout.js'

import ExcelImporter from "../api/ExcelImporter";
import cellNames from "../data/productsCellNames";

import styles from "../styles/home.css";
import StaticPage from '../components/StaticPage';

class Home extends React.Component {
    static async getInitialProps(props) {
        const { query: { title }, store, isServer } = props;
        store.dispatch(getProducts(isServer))
        return { route: { title } }
    }

    render() {
        const activeSide = 'agb';
        let md = _.first(this.props.staticTexts.filter((staticText) => {
            return staticText.path === activeSide;
        }));

        return (
            <Layout
                categories={this.props.categories}
                staticTexts={this.props.staticTexts}
            >
                <style>
                    {styles}
                </style>
                <StaticPage content={md.content} />
            </Layout>
        )
    }
}
const mapStateToProps = ({ categories, staticTexts }) => {
    return {
        categories,
        staticTexts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: bindActionCreators(getProducts, dispatch),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Home)