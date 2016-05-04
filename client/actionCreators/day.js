'use strict';

import { sendWarning } from './notifications';

/**
 * Updates asynchronously
 *
 * @param {string} date       - Day date (ISO format)
 * @param {string} content    - Day content
 * @param {string} status  - Day status, defaults to 'draft'
 * @param {function} dispatch - Dispatch function
 */
const updateAsync = _.debounce((date, content, status, dispatch) => {
  localStorage.setItem('writtenDay:date', date);
  localStorage.setItem('writtenDay:content', content);

  return dispatch({
    type: 'DAY_UPDATEREMOTE',
    api: {
      method: 'PUT',
      endpoint: '/days/' + date,
      body: {
        date: date,
        content: content,
        status: status
      }
    }
  }).catch(() => {
    dispatch(sendWarning('Echec de l\'enregistrement serveur', 5000, 'warning'));
    return Promise.reject();
  });
}, 500);

/**
 * Updates a day
 *
 * @param {string} date    - Day date (ISO format)
 * @param {string} content - Day content
 * @param {string} status  - Day status, defaults to 'draft'
 * @returns {object} Action
 */
export function update(date, content, status = 'draft') {
  return dispatch => {
    updateAsync(date, content, status, dispatch);

    return dispatch({
      type: 'DAY_UPDATE',
      payload: {
        date: date,
        content: content,
        status: status
      }
    });
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
