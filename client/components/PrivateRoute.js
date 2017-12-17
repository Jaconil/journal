/* eslint-disable react/prop-types */

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 * Renders an authenticated route component
 *
 * @param {string} path      - Route path
 * @param {object} component - Displayed authenticated component
 * @param {boolean} isLogged - True if the user is logged
 * @returns {ReactElement} Authenticated component if logged, or login redirection
 * @constructor
 */
function PrivateRoute({ path, component: Component, isLogged }) {
  return (
    <Route
      path={path}
      render={props => (
        isLogged ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
      )}
    />
  );
}

export default connect(state => {
  return {
    isLogged: state.user.token !== ''
  };
})(PrivateRoute);
