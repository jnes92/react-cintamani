import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";

export default withRedux(initStore)(
  class MyApp extends App {
    render() {
      const { Component, pageProps, store } = this.props;
      return (
          <Provider store={store}>
            {/* <div> hi </div> */}
            <Component {...pageProps} />
          </Provider>
      );
    }
  }
);
