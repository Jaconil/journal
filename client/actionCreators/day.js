'use strict';

import { sendWarning } from './notifications';

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
      dispatch(sendWarning('Echec de l\'enregistrement', 10000, 'warning'));
      return Promise.reject();
    });
  };
}
