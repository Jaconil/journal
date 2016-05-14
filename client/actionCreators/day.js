'use strict';

import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s
const UPDATE_DEBOUNCE_DELAY = 500; // 500ms

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
        date,
        content,
        status
      }
    }
  }).catch(() => {
    dispatch(sendWarning('Echec de l\'enregistrement serveur', NOTIFICATION_DURATION, 'warning'));
    return Promise.reject();
  });
}, UPDATE_DEBOUNCE_DELAY);

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
        date,
        content,
        status
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

    // FIXME: Unneeded http request
    return dispatch({
      type: 'DAY_SUBMIT',
      api: {
        method: 'PUT',
        endpoint: '/days/' + date,
        body: action.payload
      }
    }).catch(() => {
      dispatch(sendWarning('Echec de l\'enregistrement', NOTIFICATION_DURATION, 'warning'));
      return Promise.reject();
    });
  };
}
