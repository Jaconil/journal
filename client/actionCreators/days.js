'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s
const HTTP_NOT_ALLOWED = 401;

/**
 * Retrieves notWritten days from api and localstorage
 *
 * @returns {Promise} Resolves if the fetch was ok, redirects otherwise
 */
export function getNotWrittenDays() {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.days.notWrittenDays.isFetching) {
      return dispatch({
        type: 'DAYS_FETCH_NOTWRITTEN',
        api: {
          endpoint: '/days',
          query: {
            status: 'notWritten,draft',
            count: 30,
            to: moment().startOf('day').format('YYYY-MM-DD')
          }
        }
      }).catch(error => {
        if (error.status && error.status === HTTP_NOT_ALLOWED) {
          dispatch(push('/login'));
        } else {
          dispatch(sendWarning('Impossible de récupérer les données', NOTIFICATION_DURATION, 'warning'));
        }

        return Promise.reject(error);
      }).then(body => {
        if (body && body.length && !body[0].content && body[0].date === localStorage.getItem('writtenDay:date')) {
          body[0].content = localStorage.getItem('writtenDay:content');
        }

        return dispatch({
          type: 'DAYS_FETCH_NOTWRITTEN_MERGED',
          payload: body
        });
      });
    }
  };
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

/**
 * Focus or unfocus current day
 *
 * @param {bool} focused - True if current day is focused
 * @returns {object} Action
 */
export function changeCurrentDayFocus(focused) {
  return {
    type: 'DAYS_CHANGE_FOCUS',
    payload: { focused }
  };
}
