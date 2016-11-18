'use strict';

import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s
const HTTP_NOT_ALLOWED = 401;

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

/**
 * Fetch days around a given date
 *
 * @param {string} term - Term to search in dates
 * @returns {object} Action
 */
export function searchDates(term) {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.days.searchResults.isFetching) {
      return dispatch({
        type: 'DAYS_FETCH_SEARCH',
        api: {
          endpoint: '/days/search',
          query: {
            filter: decodeURIComponent(term),
          }
        }
      }).catch(error => {
        if (error.status && error.status === HTTP_NOT_ALLOWED) {
          dispatch(push('/login'));
        } else {
          dispatch(sendWarning('Impossible de récupérer les données', NOTIFICATION_DURATION, 'warning'));
        }

        return Promise.reject(error);
      });
    }
  };
}
