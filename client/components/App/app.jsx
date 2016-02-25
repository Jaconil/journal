'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Header from './../Header/header.jsx';
import Notifications from './../Notifications/notifications.jsx';

import { getNotWrittenDays } from '../../actionCreators/days.js';

import './app.less';

function setProps(state) {
  return {
    isLogged: state.user.token !== '',
    notWrittenDays: state.days.notWrittenDays.length,
    notifications: state.notifications
  };
}

class App extends React.Component {

  componentWillMount() {
    if (this.props.isLogged) {
      this.props.dispatch(getNotWrittenDays());
    }

    if (!this.props.isLogged && this.props.location.pathname !== '/login') {
      this.props.dispatch(push('/login'));
    }
  }

  render() {
    return (
      <div className="app-container">
        {this.props.isLogged ? <Header route={this.props.location.pathname} notWrittenDays={this.props.notWrittenDays} /> : null}
        {this.props.isLogged ? <Notifications list={this.props.notifications} /> : null}
        {this.props.children}
      </div>
    );
  }
}

export default connect(setProps)(App);
