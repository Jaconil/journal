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

export { getNotWrittenDays };
