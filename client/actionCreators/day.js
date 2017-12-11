import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s
const UPDATE_DEBOUNCE_DELAY = 500; // 500ms

/**
 * Updates a day on the server
 *
 * @param {function} dispatch - Dispatch function
 * @param {string} date       - Day date (ISO format)
 * @param {string} content    - Day content
 * @param {string} status     - Day status
 * @return {Promise} Resolves if the day updated correctly
 */
function updateRemote(dispatch, date, content, status) {
  return dispatch({
    type: 'DAY_UPDATEREMOTE',
    api: {
      method: 'PUT',
      endpoint: '/days/' + date,
      body: {
        content,
        status
      }
    }
  }).catch(() => {
    dispatch(sendWarning('Echec de l\'enregistrement', NOTIFICATION_DURATION, 'warning'));
    return Promise.reject(new Error('Saving error'));
  });
}

const updateRemoteAsync = _.debounce(updateRemote, UPDATE_DEBOUNCE_DELAY);

/**
 * Creates a day update action
 *
 * @param {string} date       - Day date (ISO format)
 * @param {string} content    - Day content
 * @param {string} status     - Day status
 * @return {object} Action
 */
export function updateDay(date, content, status) {
  return {
    type: 'DAY_UPDATE',
    payload: {
      date,
      content,
      status
    }
  };
}

/**
 * Updates a day
 *
 * @param {string} date    - Day date (ISO format)
 * @param {string} content - Day content
 * @returns {object} Action
 */
export function update(date, content) {
  return dispatch => {
    updateRemoteAsync(dispatch, date, content, 'draft');
    return dispatch(updateDay(date, content, 'draft'));
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
    return updateRemote(dispatch, date, content, 'written').then(() => {
      return dispatch(updateDay(date, content, 'written'));
    });
  };
}
