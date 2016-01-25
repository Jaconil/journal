'use strict';

export function getNotWrittenDays() {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.days.notWrittenDays.isFetching) {
      return dispatch({
        type: 'DAYS_FETCH_NOTWRITTEN',
        api: {
          endpoint: '/days',
          query: { status: 'notWritten' }
        }
      }).catch(() => {
        // todo: rediriger vers le login ?
      });
    }
  };
}

export function selectNextNotWrittenDay() {
  return {
    type: 'DAYS_NEXT_NOTWRITTEN'
  };
}
