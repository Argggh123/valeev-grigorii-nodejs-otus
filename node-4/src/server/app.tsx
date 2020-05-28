import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../client/App';
import { rootReducer } from '../client/redux';

function readHtml(indexFile: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(indexFile, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

const renderApp = async (req, res) => {
  try {
    const { url, originalUrl } = req;
    const context = {};

    const store = createStore(rootReducer);
    const preloadedState = store.getState();

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={url || originalUrl} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    const indexFile = path.resolve('dist', 'index.html');
    let data = await readHtml(indexFile);
    data = data.replace(
      '<script>window.INITIAL_DATA = {}</script>',
      `<script>window.INITIAL_DATA = ${serialize(preloadedState)}</script>`,
    );
    data = data.replace('<div id="app"></div>', `<div id="app">${markup}</div>`);
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('Ooops, try again');
  }
};

export default renderApp;
