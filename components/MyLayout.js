import React, { Component } from "react";
import { connect } from "react-redux";

import Footer from "./Footer";
import Head from "next/head";

import main from "../styles/main.css";
import normalize from "../styles/normalize.css";
import bulma from "bulma/css/bulma.css";
import Navigation from "./navigation";

class Layout extends Component {
  render() {
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <script src="https://use.fontawesome.com/7e6f9ff058.js" />
          <style global="true">
            {`
    ${main}
    ${normalize}
    ${bulma}
    `}
          </style>
        </Head>
        <div className="section has-navbar-fixed-bottom">
          <Navigation categories={this.props.categories} />
          <section className="section">
            <div className="container">{this.props.children}</div>
          </section>
        </div>
        <Footer staticTexts={this.props.staticTexts} />
      </div>
    );
  }
}

const mapStateToProps = ({ products, categories, staticTexts }) => {
  return {
    products,
    categories,
    staticTexts
  };
};

export default connect(mapStateToProps)(Layout);
