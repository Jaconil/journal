/* eslint-disable react/prop-types */

import { Route, Switch, withRouter } from 'react-router-dom';

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
      <Switch>
        <Route path="/explore/:date" component={ExploreList} />
        <Route component={ExploreDatepicker} />
      </Switch>
    </section>
  );
}

export default withRouter(ExplorePage);
