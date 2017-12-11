import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

    const username = this.username.value;
    const password = this.password.value;

    this.props.dispatch(login(username, password));
  }

  render() {
    if (this.props.isLogged) {
      return (
        <Redirect to="/write" />
      );
    }

    const classes = classNames(
      'login-box',
      'animated',
      {
        fadeInDown: this.props.nbLogin === 0,
        shake: this.props.nbLogin > 0
      }
    );

    return (
      <form key={this.props.nbLogin} className={classes} method="post" autoComplete="off" onSubmit={this.onSubmit}>
        <input type="text" ref={element => this.username = element} autoFocus />
        <input type="password" ref={element => this.password = element} />
        <input type="submit" value="▶" />
        <hr />
      </form>
    );
  }
}

LoginBox.propTypes = {
  nbLogin: PropTypes.number.isRequired
};

export default connect(setProps)(LoginBox);
