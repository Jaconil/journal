'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';

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
      }).then(body => {
        if (body.length && body[0].date === localStorage.getItem('notWrittenDay:date')) {
          body[0].content = localStorage.getItem('notWrittenDay:content');
        }

        return dispatch({
          type: 'DAYS_FETCH_NOTWRITTEN_SUCCESS',
          payload: body
        });
      }).catch(() => {
        dispatch(push('/login'));
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
