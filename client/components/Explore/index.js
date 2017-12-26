/* eslint-disable react/prop-types */

import { Route, withRouter } from 'react-router-dom';

import ExploreDatepicker from './exploreDatepicker';
import ExploreList from './exploreList';

/**
 * Explore page
 *
 * @returns {ReactElement} Explore page
 * @constructor
 */
function ExplorePage() {
  return (
    <section className="page explorePage">
      <Route path="/explore/:date" component={ExploreList} />
      <Route exact path="/explore" component={ExploreDatepicker} />
    </section>
  );
}

export default withRouter(ExplorePage);
