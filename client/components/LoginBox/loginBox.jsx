'use strict';

import { connect } from 'react-redux';

import classNames from 'classnames';

import { login, logout } from '../../actionCreators/user.js';

import './loginBox.less';

/**
 * Maps state to props
 *
 * @param {object} state - State
 * @returns {object} Props
 */
function setProps(state) {
  return {
    nbLogin: state.user.nbLogin,
    isLogged: state.user.token !== ''
  };
}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(logout());
  }

  onSubmit(event) {
    event.preventDefault();

    var username = this.refs.username.value;
    var password = this.refs.password.value;

    this.props.dispatch(login(username, password));
  }

  render() {

    var classes = classNames(
      'login-box',
      'animated',
      {
        fadeInDown: this.props.nbLogin === 0,
        shake: this.props.nbLogin > 0
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
