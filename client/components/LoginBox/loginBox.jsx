'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import classNames from 'classnames';

import userStore from '../../stores/userStore';
import dispatcher from '../../dispatcher';

import { login } from '../../userActions.js';

import './loginBox.less';

function setProps(state) {
  return {
    nbLogin: state.user.nbLogin
  };
}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    userStore.addChangeListener(this.onLogin);
    dispatcher.emit(events.user.CLEAR);
  }

  componentWillUnmount() {
    userStore.removeChangeListener(this.onLogin);
  }

  onLogin() {
    //this.setState({
    //  nbLogin: this.state.nbLogin + 1
    //});

    if (userStore.hasToken()) {
      this.props.dispatch(pushState(null, '/write'));
    }
  }

  onSubmit(event) {
    event.preventDefault();

    var username = this.refs.username.value;
    var password = this.refs.password.value;

    //dispatcher.emit(events.user.LOGIN, username, password);
    this.props.dispatch(login(username, password));
  }

  render() {

    var classes = classNames(
      'login-box',
      'animated',
      {
        fadeInDown: this.props.nbLogin <= 1,
        shake: this.props.nbLogin > 1
      }
    );

    return (
      <form key={this.props.nbLogin} className={classes} method="post" autoComplete="off" onSubmit={this.onSubmit}>
        <input type="text" ref="username" autoFocus />
        <input type="password" ref="password" />
        <input type="submit" value="▶" />
        <hr />
      </form>
    );
  }

}

export default connect(setProps)(LoginBox);
