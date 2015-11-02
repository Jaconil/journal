'use strict';

import React from 'react';
import { History } from 'react-router';
import classNames from 'classnames';

import userStore from '../../stores/userStore';
import dispatcher from '../../dispatcher';

var LoginBox = React.createClass({

  mixins: [History],

  getInitialState: function() {
    return {
      fade: true,
      shake: false,
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
    if (this.state.nbLogin === 0) {
      this.state.nbLogin = 1;
      return;
    }

    if (userStore.hasToken()) {
      this.history.pushState(null, '/write');
    } else {
      this.setState({
        fade: false,
        shake: true,
        nbLogin: this.state.nbLogin + 1
      });
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
        fadeInDown: this.state.fade,
        shake: this.state.shake
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
