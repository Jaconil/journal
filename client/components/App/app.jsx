'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import Header from './../Header/header.jsx';

import { checkLogin } from '../../actionCreators/user.js';

import daysStore from '../../stores/daysStore';

import './app.less';

function setProps(state) {
  return {
    isLogged: state.user.token !== '',
  };
}

class App extends React.Component {

  componentWillMount() {
    this.props.dispatch(checkLogin());
    //if (!this.props.isLogged && this.props.location.pathname !== '/login') {
    //  this.props.dispatch(pushState(null, '/login'));
    //}
  }

  render() {
    return (
      <div className="app-container">
        {this.props.isLogged ? <Header remainingDays={daysStore.getTotalRemainingDays()} /> : null}
        {this.props.children}
      </div>
    );
  }
}

export default connect(setProps)(App);
