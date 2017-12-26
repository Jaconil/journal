import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import Header from './../Header/header.jsx';
import Notifications from './../Notifications/notifications.jsx';

import { getNotWrittenDays } from '../../actionCreators/days.js';

import './app.less';

import PrivateRoute from './../PrivateRoute.js';
import LoginBox from './../LoginBox/loginBox.jsx';
import WritePage from './../WritePage/writePage.jsx';
import ExplorePage from './../ExplorePage/explorePage.jsx';
import ExploreListPage from './../ExploreListPage/exploreListPage.jsx';
import SearchPage from './../SearchPage/searchPage.jsx';
import SearchResultsPage from './../SearchResultsPage/searchResultsPage.jsx';

class AppPage2 extends React.Component {

  constructor() {
    super();

    this.handleChangeIndex = this.handleChangeIndex.bind(this);

    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    console.log('loc', this.props.location.pathname);
    if (this.props.location.pathname === '/write') {
      console.log('setState 0');
      this.setState({ index: 0 });
    } else if (this.props.location.pathname === '/explore') {
      console.log('setState 1');
      this.setState({ index: 1 });
    } else if (this.props.location.pathname === '/search') {
      console.log('setState 2');
      this.setState({ index: 2 });
    }
  }

  handleChangeIndex(index) {
    this.setState({ index });

    if (index === 0) {
      this.props.history.push(`/write`);
    } else if (index === 1) {
      this.props.history.push(`/explore`);
    } else if (index === 2) {
      this.props.history.push(`/search`);
    }
  }

  render() {
    console.log('render', this.state.index);
    return (
      <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
        <WritePage />
        <ExplorePage />
        <SearchPage />
      </SwipeableViews>
    );
  }
}

const AppPage = withRouter(AppPage2);

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
            <PrivateRoute path="/write" component={AppPage} />
            <PrivateRoute path="/explore/:date" component={ExploreListPage} />
            <PrivateRoute path="/explore" component={AppPage} />
            <PrivateRoute path="/search/:term" component={SearchResultsPage} />
            <PrivateRoute path="/search" component={AppPage} />
            <PrivateRoute path="/test" component={AppPage} />
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
