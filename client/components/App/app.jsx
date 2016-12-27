import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Header from './../Header/header.jsx';
import Notifications from './../Notifications/notifications.jsx';

import { getNotWrittenDays } from '../../actionCreators/days.js';

import './app.less';

/**
 * Maps state to props
 *
 * @param {object} state - State
 * @returns {object} Props
 */
function setProps(state) {
  return {
    isLogged: state.user.token !== '',
    notWrittenDays: _.reject(state.days.notWrittenDays.list, { status: 'written' }).length,
    notifications: state.notifications
  };
}

class App extends React.Component {

  componentWillMount() {
    if (this.props.isLogged) {
      this.props.dispatch(getNotWrittenDays());
    }

    if (!this.props.isLogged && this.props.location.pathname !== '/login') {
      this.props.dispatch(push('/login'));
    }
  }

  render() {
    return (
      <div className="app-container">
        {this.props.isLogged ? <Header route={this.props.location.pathname} notWrittenDays={this.props.notWrittenDays} /> : null}
        {this.props.isLogged ? <Notifications list={this.props.notifications} /> : null}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  isLogged: React.PropTypes.bool.isRequired,
  notWrittenDays: React.PropTypes.number.isRequired,
  notifications: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default connect(setProps)(App);
