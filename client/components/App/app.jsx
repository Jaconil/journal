'use strict';

import React from 'react';
import { connect } from 'react-redux';

import Header from './../Header/header.jsx';

import { checkAuth } from '../../actionCreators/user.js';
import { getNotWrittenDays } from '../../actionCreators/days.js';

import './app.less';

function setProps(state) {
  return {
    isLogged: state.user.token !== '',
    notWrittenDays: state.days.notWrittenDays.length
  };
}

class App extends React.Component {

  componentWillMount() {
    this.props.dispatch(checkAuth());

    if (this.props.isLogged) {
      this.props.dispatch(getNotWrittenDays());
    }
  }

  render() {
    return (
      <div className="app-container">
        {this.props.isLogged ? <Header notWrittenDays={this.props.notWrittenDays} /> : null}
        {this.props.children}
      </div>
    );
  }
}

export default connect(setProps)(App);
