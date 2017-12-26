import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Header from './../Header/header.jsx';
import Notifications from './../Notifications/notifications.jsx';

import { getNotWrittenDays } from '../../actionCreators/days.js';

import './app.less';

import PrivateRoute from './privateRoute';
import SwipeablePages from './swipeablePages';
import LoginBox from './../LoginBox/loginBox.jsx';

class App extends React.Component {

  componentWillMount() {
    if (this.props.isLogged) {
      this.props.dispatch(getNotWrittenDays());
    }
  }

  render() {
    return (
      <BrowserRouter basename={window.Journal.baseUrl}>
        <div className="app-container">
          {this.props.isLogged ? <Header notWrittenDays={this.props.notWrittenDays} /> : null}
          {this.props.isLogged ? <Notifications list={this.props.notifications} /> : null}
          <Switch>
            <Route path="/login" component={LoginBox} />
            <PrivateRoute path="/write" component={SwipeablePages} />
            <PrivateRoute path="/explore" component={SwipeablePages} />
            <PrivateRoute path="/search" component={SwipeablePages} />
            <Redirect to="/login" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  notWrittenDays: PropTypes.number.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(state => {
  return {
    isLogged: state.user.token !== '',
    notWrittenDays: _.reject(state.days.notWrittenDays.list, { status: 'written' }).length,
    notifications: state.notifications
  };
})(App);
