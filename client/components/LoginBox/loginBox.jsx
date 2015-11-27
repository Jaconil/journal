'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import classNames from 'classnames';

import userStore from '../../stores/userStore';
import dispatcher from '../../dispatcher';

import './loginBox.less';

function setProps(state) {
  return {};
}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      nbLogin: 0
    };
  }

  componentWillMount() {
    userStore.addChangeListener(this.onLogin);
    dispatcher.emit(events.user.CLEAR);
  }

  componentWillUnmount() {
    userStore.removeChangeListener(this.onLogin);
  }

  onLogin() {
    this.setState({
      nbLogin: this.state.nbLogin + 1
    });

    if (userStore.hasToken()) {
      this.props.dispatch(pushState(null, '/write'));
    }
  }

  onSubmit(event) {
    event.preventDefault();

    var username = this.refs.username.value;
    var password = this.refs.password.value;

    dispatcher.emit(events.user.LOGIN, username, password);
  }

  render() {

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

}

export default connect(setProps)(LoginBox);
