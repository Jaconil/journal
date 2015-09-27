'use strict';

import React from 'react';
import { History } from 'react-router';
import classNames from 'classnames'

import userStore, { events as userEvents } from '../../stores/userStore';
import dispatcher from '../../dispatcher';

var LoginBox = React.createClass({

  mixins: [ History ],

  getInitialState: function() {
    return {
      fade: true,
      shake: false,
      nbLogin: 0
    };
  },

  componentWillMount: function() {
    userStore.addChangeListener(this.onLogin);
    dispatcher.emit(userEvents.CLEAR);
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

    var username = React.findDOMNode(this.refs.username).value;
    var password = React.findDOMNode(this.refs.password).value;

    dispatcher.emit(userEvents.LOGIN, username, password);
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
