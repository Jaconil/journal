'use strict';

export function getNotWrittenDays() {
  return function(dispatch, getState) {
    const state = getState();

    if (!state.days.notWrittenDays.isFetching) {
      return dispatch({
        type: 'DAYS_FETCH_NOTWRITTEN',
        api: {
          endpoint: '/days',
          query: { status: 'notWritten' }
        }
      });
    }
  };
}

export function selectNextNotWrittenDay() {
  return {
    type: 'DAYS_NEXT_NOTWRITTEN'
  };
}
