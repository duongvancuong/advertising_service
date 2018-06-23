import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import './App.css';

const AsyncComponent = Loadable({
  loader: () => import(/* webpackChunkName: "myNamedChunk" */ './Test'),
  loading: () => <div>loading...</div>,
  modules: ['myNamedChunk'],
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="./logo.svg" className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <AsyncComponent demo={this.props.demo} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (states) => {
  const { isAuthenticated, demo } = states.auth;
  return {
    isAuthenticated,
    demo,
  }
}

export default connect(mapStateToProps)(App);
