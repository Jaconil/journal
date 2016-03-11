'use strict';

import { sendWarning } from './notifications';

export function update(date, content, status = 'notWritten') {
  // todo: update localstorage if notwritten
  sessionStorage.setItem(date, content);

  return {
    type: 'DAY_UPDATE',
    payload: {
      date: date,
      content: content,
      status: status
    }
  };
}

export function submit(date, content) {
  return dispatch => {
    const action = dispatch(update(date, content, 'written'));

    return dispatch({
      type: 'DAY_SUBMIT',
      api: {
        method: 'PUT',
        endpoint: '/days/' + date,
        body: action.payload
      }
    }).catch(() => {
      dispatch(sendWarning('Echec de l\'enregistrement', 5000, 'warning'));
      return Promise.reject();
    });
  };
}
