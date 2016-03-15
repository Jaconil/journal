'use strict';

import { sendWarning } from './notifications';

/**
 * Updates a day, updating localstorage
 *
 * @param {string} date    - Day date (ISO format)
 * @param {string} content - Day content
 * @param {string} status  - Day status, defaults to 'notWritten'
 * @returns {object} Action
 */
export function update(date, content, status = 'notWritten') {
  localStorage.setItem('writtenDay:date', date);
  localStorage.setItem('writtenDay:content', content);

  return {
    type: 'DAY_UPDATE',
    payload: {
      date: date,
      content: content,
      status: status
    }
  };
}

/**
 * Submits a day
 *
 * @param {string} date    - Day date (ISO format)
 * @param {string} content - Day content
 * @returns {Promise} Resolves if the day submitted correctly
 */
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
