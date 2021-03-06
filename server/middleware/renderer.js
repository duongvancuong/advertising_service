import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
// import Loadable from 'react-loadable';

// read the manifest file
import manifest from '../../build/asset-manifest.json';

// function to map chunk names to assets
const extractAssets = (assets, chunks) => Object.keys(assets)
  .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
  .map(k => assets[k]);

// import our main App component
import App from '../../src/App';

const path = require("path");
const fs = require("fs");

export default (store) => (req, res, next) => {

  // get the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end()
    }

    const modules = [];

    // render the app as a string
    const html = ReactDOMServer.renderToString(
      <ReduxProvider store={store}>
        <App/>
      </ReduxProvider>
    );
    console.log(modules);
    const reduxState = JSON.stringify(store.getState());

    const extraChunks = extractAssets(manifest, modules)
      .map(c => `<script type="text/javascript" src="/${c}"></script>`);

    console.log(extractAssets(manifest, modules));

    // now inject the rendered app into our html and send it
    return res.send(
      htmlData
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replace('</body>', extraChunks.join('') + '</body>')
        .replace('"__SERVER_REDUX_STATE__"', reduxState)
    );
  });
}
