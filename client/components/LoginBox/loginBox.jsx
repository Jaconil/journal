'use strict';

import React from 'react';
import { Navigation } from 'react-router';
import classNames from 'classnames'

import UserStore, { events as userEvents } from '../../stores/userStore';
import Dispatcher from '../../dispatcher';

var LoginBox = React.createClass({

  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      fade: true,
      shake: false,
      nbLogin: 0
    };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.onLogin);

    if (UserStore.isLogged()) {
      this.transitionTo('write');
    }
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.onLogin);
  },

  onLogin: function() {
    if (UserStore.isLogged()) {
      this.transitionTo('write');
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

    Dispatcher.emit(userEvents.LOGIN, username, password);
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
        <input type="submit" value="&#9654;" />
        <hr />
      </form>
    );
  }
});

export default LoginBox;
