'use strict';

export function update(date, content) {
  return dispatch => {
    return dispatch({
      type: 'DAY_UPDATE',
      api: {
        method: 'PUT',
        endpoint: '/days/' + date,
        body: {
          date: date,
          content: content,
          status: 'written'
        }
      }
    }).catch(() => {
      // TODO
    });
  };
}
