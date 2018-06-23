import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
// import createHashHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';

import configureStore from './store/configureStore';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const AppBundle = (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      AppBundle,
      document.getElementById('root')
    );
  });
};

registerServiceWorker();
