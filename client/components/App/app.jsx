'use strict';

import React from 'react';
import { connect } from 'react-redux';

import Header from './../Header/header.jsx';
import Notifications from './../Notifications/notifications.jsx';

import { checkAuth } from '../../actionCreators/user.js';
import { getNotWrittenDays } from '../../actionCreators/days.js';

import './app.less';

function setProps(state) {
  return {
    route: state.router.location.pathname,
    isLogged: state.user.token !== '',
    notWrittenDays: state.days.notWrittenDays.length,
    notifications: state.notifications
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
        {this.props.isLogged ? <Header route={this.props.route} notWrittenDays={this.props.notWrittenDays} /> : null}
        {this.props.isLogged ? <Notifications list={this.props.notifications} /> : null}
        {this.props.children}
      </div>
    );
  }
}

export default connect(setProps)(App);
