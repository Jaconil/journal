'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s
const HTTP_NOT_ALLOWED = 401;

/**
 * Logout the current user
 *
 * @param {string} date - Submitted date
 * @returns {object} Action
 */
export function submitDate(date) {
  return (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: 'EXPLORE_DATE_SUBMITTED',
      payload: {
        date
      }
    });

    if (!state.days.exploredDays.isFetching) {
      return dispatch({
        type: 'EXPLORE_FETCH_SUBMITTED',
        api: {
          endpoint: '/days',
          query: {
            status: 'written',
            from: date,
            to: date
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
