/* eslint-disable react/prop-types */

import { Route, withRouter } from 'react-router-dom';

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
      <Route path="/search/:term" component={SearchResults} />
      <Route component={SearchInput} />
    </section>
  );
}

export default withRouter(SearchPage);
