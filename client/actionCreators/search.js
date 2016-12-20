import { push } from 'react-router-redux';

/**
 * Submit a search input
 *
 * @param {string} input - Input submitted
 * @returns {object} Action
 */
export function submit(input) {
  return dispatch => {
    return dispatch(push('/search/' + encodeURIComponent(input)));
  };
}
