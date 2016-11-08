'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s
const HTTP_NOT_ALLOWED = 401;
const DELTA_DAYS = 30;

/**
 * Submit a date
 *
 * @returns {object} Action
 */
export function submitDate(date) {
  return dispatch => {
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
      return dispatch(push('/explore/' + date));
    }

    dispatch(sendWarning('La date est invalide', NOTIFICATION_DURATION, 'warning'));
  };
}

/**
 * Fetch days around a given date
 *
 * @param {string} date - Date
 * @returns {object} Action
 */
export function fetchDate(date) {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.days.exploredDays.isFetching) {
      return dispatch({
        type: 'DAYS_FETCH_EXPLORE',
        api: {
          endpoint: '/days',
          query: {
            status: 'written',
            from: moment(date).subtract(DELTA_DAYS, 'days').format('YYYY-MM-DD'),
            to: moment(date).add(DELTA_DAYS, 'days').format('YYYY-MM-DD')
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
