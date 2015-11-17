'use strict';

import React from 'react';
import { History } from 'react-router';
import classNames from 'classnames';

import userStore from '../../stores/userStore';
import dispatcher from '../../dispatcher';

import './loginBox.less';

var LoginBox = React.createClass({

  mixins: [History],

  getInitialState: function() {
    return {
      nbLogin: 0
    };
  },

  componentWillMount: function() {
    userStore.addChangeListener(this.onLogin);
    dispatcher.emit(events.user.CLEAR);
  },

  componentWillUnmount: function() {
    userStore.removeChangeListener(this.onLogin);
  },

  onLogin: function() {
    this.setState({
      nbLogin: this.state.nbLogin + 1
    });

    if (userStore.hasToken()) {
      this.history.pushState(null, '/write');
    }
  },

  onSubmit: function(event) {
    event.preventDefault();

    var username = this.refs.username.value;
    var password = this.refs.password.value;

    dispatcher.emit(events.user.LOGIN, username, password);
  },

  render: function() {

    var classes = classNames(
      'login-box',
      'animated',
      {
        fadeInDown: this.state.nbLogin <= 1,
        shake: this.state.nbLogin > 1
      }
    );

    return (
      <form key={this.state.nbLogin} className={classes} method="post" autoComplete="off" onSubmit={this.onSubmit}>
        <input type="text" ref="username" autoFocus />
        <input type="password" ref="password" />
        <input type="submit" value="▶" />
        <hr />
      </form>
    );
  }
});

export default LoginBox;
