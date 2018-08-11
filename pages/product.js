import React from "react";
import { connect } from "react-redux";

import { getProducts } from "../store";
import _ from "lodash";

import Layout from "../components/MyLayout.js";
import ProductDetails from "../components/ProductDetails";
import cellNames from "../data/productsCellNames";

class Product extends React.Component {
  static getInitialProps(props) {
    const {
      query: { id },
      store,
      isServer
    } = props;
    store.dispatch(getProducts(isServer));
    return { route: { id } };
  }

  render() {
    const { id } = this.props.route;
    const chosenProduct = _.first(
      _.filter(this.props.products, item => {
        if (item[cellNames.ID] == id.toString()) return item;
      })
    );

    /// TODO: UseImageHelper -> DataHelper Class for getting main, side category.
    const mainCategory = _.trim(chosenProduct[cellNames.Category].split("-")[0]);
    const sideCategory = _.trim(chosenProduct[cellNames.Category].split("-")[1]);

    return (
      <Layout>
        <nav className="breadcrumb is-centered" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="#">{mainCategory}</a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                {sideCategory}
              </a>
            </li>
          </ul>
        </nav>
        <ProductDetails product={chosenProduct} category={sideCategory} />
      </Layout>
    );
  }
}

const mapStateToProps = ({ products, categories }) => {
  return {
    products,
    categories
  };
};

export default connect(mapStateToProps)(Product);
