import React from "react";
import { connect } from "react-redux";
import { getProducts } from "../store";
import Layout from "../components/MyLayout.js";

class Home extends React.Component {
  static getInitialProps({ store, isServer }) {
    store.dispatch(getProducts(isServer));
  }

  render() {
    return (
      <div>
        <section
          className="hero is-fullheight"
          style={{
            background: "url('/static/images/head1_web.jpg') center center",
            backgroundSize: "cover"
          }}
        >
          <div className="hero-body">
            <div className="container">
              <h1 className="title has-text-white">Buddhas aus Nepal</h1>
              <h2 className="subtitle has-text-white">seltene Kunstwerke</h2>
            </div>
          </div>
        </section>
        <Layout />
      </div>
    );
  }
}

export default connect()(Home);
