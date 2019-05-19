import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from "react-redux";
// import App from '../common/containers/App';
import Router from "../common/routes";
import configStore from "../common/store";
import "./index.css";
import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

const store = configStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <Router />
  </Provider>
  ,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept("../common/containers/App", () => {
    hydrate(
      <Provider store={store}>
        <Router />
      </Provider>
      ,
      document.getElementById('root')
    );
  });
}
