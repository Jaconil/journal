/* eslint-disable react/prop-types */

import { Route, Switch, withRouter } from 'react-router-dom';

import SearchInput from './searchInput';
import SearchResults from './searchResults';

/**
 * Search page
 *
 * @returns {ReactElement} Search page
 * @constructor
 */
function SearchPage() {
  return (
    <section className="page searchPage">
      <Switch>
        <Route path="/search/:term" component={SearchResults} />
        <Route component={SearchInput} />
      </Switch>
    </section>
  );
}

export default withRouter(SearchPage);
