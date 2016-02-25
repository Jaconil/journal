'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';

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
      }).catch(() => {
        dispatch(push('/login'));
      });
    }
  };
}

export function selectNextNotWrittenDay() {
  return {
    type: 'DAYS_NEXT_NOTWRITTEN'
  };
}
