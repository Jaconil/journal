'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s
const HTTP_NOT_ALLOWED = 401;

const DELTA_DAYS = 30;

/**
 * Fetch days and handle errors
 *
 * @param {string} statePath - Path to the state object
 * @param {object} action    - Action to dispatch
 * @returns {Function} Action
 */
function getDays(statePath, action) {
  return (dispatch, getState) => {
    const state = getState();

    if (!_.get(state.days, statePath).isFetching) {
      return dispatch(action).catch(error => {
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

/**
 * Retrieves notWritten days from api
 *
 * @returns {Promise} Resolves if the fetch was ok, redirects otherwise
 */
export function getNotWrittenDays() {
  return getDays('notWrittenDays', {
    type: 'DAYS_FETCH_NOTWRITTEN',
    api: {
      endpoint: '/days',
      query: {
        status: 'notWritten,draft',
        count: 30,
        to: moment().startOf('day').format('YYYY-MM-DD')
      }
    }
  });
}

/**
 * Fetch days around a given date
 *
 * @param {string} date - Date
 * @returns {object} Action
 */
export function fetchDate(date) {
  return getDays('exploredDays', {
    type: 'DAYS_FETCH_EXPLORE',
    api: {
      endpoint: '/days',
      query: {
        status: 'written',
        from: moment(date).subtract(DELTA_DAYS, 'days').format('YYYY-MM-DD'),
        to: moment(date).add(DELTA_DAYS, 'days').format('YYYY-MM-DD')
      }
    }
  });
}

/**
 * Fetch days around a given date
 *
 * @param {string} term - Term to search in dates
 * @returns {object} Action
 */
export function searchDates(term) {
  return getDays('searchResults', {
    type: 'DAYS_FETCH_SEARCH',
    api: {
      endpoint: '/days/search',
      query: {
        filter: decodeURIComponent(term)
      }
    }
  });
}

/**
 * Selects next notWritten day
 *
 * @returns {object} Action
 */
export function selectNextNotWrittenDay() {
  return {
    type: 'DAYS_NEXT_NOTWRITTEN'
  };
}
