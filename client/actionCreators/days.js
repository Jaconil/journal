'use strict';

function getNotWrittenDays() {
  return {
    type: 'DAYS_FETCH_NOTWRITTEN',
    api: {
      endpoint: '/days',
      query: { status: 'notWritten' }
    }
  };
}

function selectNextNotWrittenDay() {
  return {
    type: 'DAYS_NEXT_NOTWRITTEN'
  };
}

export { getNotWrittenDays, selectNextNotWrittenDay };
