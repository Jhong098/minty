import App from '../App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from "react-redux";
import configStore from "../common/store";

const store = configStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept("../common/containers/App", () => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      ,
      document.getElementById('root')
    );
  });
}
