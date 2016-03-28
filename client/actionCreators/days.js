'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

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
            status: 'notWritten',
            count: 30,
            to: moment().startOf('day').format('YYYY-MM-DD')
          }
        }
      }).catch(error => {
        if (error.status && error.status === 401) {
          dispatch(push('/login'));
        } else {
          dispatch(sendWarning('Impossible de récupérer les données', 5000, 'warning'));
        }

        return Promise.reject(error);
      }).then(body => {
        if (body && body.length && body[0].date === localStorage.getItem('writtenDay:date')) {
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
