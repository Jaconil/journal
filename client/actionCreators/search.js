'use strict';

import { push } from 'react-router-redux';

/**
 * Submit a search input
 *
 * @returns {object} Action
 */
export function submit(input) {
  return dispatch => {
    return dispatch(push('/search/' + encodeURIComponent(input)));
  };
}
