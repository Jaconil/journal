import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Header from './../Header/header.jsx';
import Notifications from './../Notifications/notifications.jsx';

import { getNotWrittenDays } from '../../actionCreators/days.js';

import './app.less';

import LoginBox from './../LoginBox/loginBox.jsx';
import WritePage from './../WritePage/writePage.jsx';
import ExplorePage from './../ExplorePage/explorePage.jsx';
import ExploreListPage from './../ExploreListPage/exploreListPage.jsx';
import SearchPage from './../SearchPage/searchPage.jsx';
import SearchResultsPage from './../SearchResultsPage/searchResultsPage.jsx';

function PrivateRouteInt({ path, component: Component, isLogged }) {
  function conditionalRender(props) {
    return (
      isLogged ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    );
  }

  return (
    <Route path={path} render={conditionalRender}/>
  );
}

const PrivateRoute = connect((state) => {
  return { isLogged: state.user.token !== '' }
})(PrivateRouteInt);


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
  }

  render() {
    return (
      <BrowserRouter basename={window.Journal.baseUrl}>
        <div className="app-container">
          {this.props.isLogged ? <Header notWrittenDays={this.props.notWrittenDays} /> : null}
          {this.props.isLogged ? <Notifications list={this.props.notifications} /> : null}
          <Switch>
            <Route path="/login" component={LoginBox} />
            <PrivateRoute path="/write" component={WritePage} />
            <PrivateRoute path="/explore/:date" component={ExploreListPage} />
            <PrivateRoute path="/explore" component={ExplorePage} />
            <PrivateRoute path="/search/:term" component={SearchResultsPage} />
            <PrivateRoute path="/search" component={SearchPage} />
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

export default connect(setProps)(App);
