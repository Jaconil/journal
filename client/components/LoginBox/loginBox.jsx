'use strict';

import React from 'react';
import AuthStore from '../../stores/authStore';
import Dispatcher from '../../dispatcher';

var LoginBox = React.createClass({
  componentDidMount: function() {
    AuthStore.addChangeListener(this.onLogin);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this.onLogin);
  },

  onLogin: function() {
    if (AuthStore.isLogged()) {
      // redirection
    } else {
      //this.$.form.classList.remove('fadeInDown', 'shake');
      //setTimeout(function() {
      //  this.$.form.classList.add('shake');
      //}.bind(this), 0);
    }
  },

  onSubmit: function(event) {
    event.preventDefault();

    var username = React.findDOMNode(this.refs.username).value;
    var password = React.findDOMNode(this.refs.password).value;

    Dispatcher.emit('auth.login', username, password);
  },

  render: function() {
    return (
      <form className="login-box animated fadeInDown" method="post" autoComplete="off" onSubmit={this.onSubmit}>
        <input type="text" ref="username" autoFocus />
        <input type="password" ref="password" />
        <input type="submit" value="&#9654;" />
        <hr />
      </form>
    );
  }
});

export default LoginBox;
