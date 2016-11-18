'use strict';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Redirect, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createHistory } from 'history';

import createStore from './store';

import App from './components/App/app.jsx';
import LoginBox from './components/LoginBox/loginBox.jsx';
import WritePage from './components/WritePage/writePage.jsx';
import ExplorePage from './components/ExplorePage/explorePage.jsx';
import ExploreListPage from './components/ExploreListPage/exploreListPage.jsx';
import SearchPage from './components/SearchPage/searchPage.jsx';
import SearchResultsPage from './components/SearchResultsPage/searchResultsPage.jsx';

const browserHistory = useRouterHistory(createHistory)({
  basename: window.Journal.baseUrl
});

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="login" component={LoginBox} />
        <Route path="write" component={WritePage} />
        <Route path="explore" component={ExplorePage} />
        <Route path="explore/:date" component={ExploreListPage} />
        <Route path="search" component={SearchPage} />
        <Route path="search/:term" component={SearchResultsPage} />
        <Redirect from="*" to="/login" />
      </Route>
    </Router>
  </Provider>
), document.querySelector('#app'));
