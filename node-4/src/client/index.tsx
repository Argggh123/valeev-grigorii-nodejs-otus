import React from 'react';
import { createStore } from 'redux';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from './App';

import './index.pcss';
import { rootReducer } from './redux';

// @ts-ignore
const preloadedState = window.INITIAL_DATA || {};

// @ts-ignore
delete window.INITIAL_DATA;

const store = createStore(rootReducer, preloadedState);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

hydrate(
  app,
  document.getElementById('app'),
);
