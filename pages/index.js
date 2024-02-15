import React from "react";
import { connect } from "react-redux";
import { getProducts, initialState } from "../store";
import Layout from "../components/MyLayout.js";

class Home extends React.Component {
  static getInitialProps({ store, isServer }) {
    console.log(store)
    store.dispatch(getProducts(isServer));
    return initialState
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
