'use strict';

import { push } from 'react-router-redux';

export function getNotWrittenDays() {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.days.notWrittenDays.isFetching) {
      return dispatch({
        type: 'DAYS_FETCH_NOTWRITTEN',
        api: {
          endpoint: '/days',
          query: { status: 'notWritten', limit: 30 }
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
