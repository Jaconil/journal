'use strict';

/**
 * Send a notification
 *
 * @param {string} level    - Notification level (info, warning)
 * @param {string} content  - Notification content
 * @param {int}    duration - Notification duration
 * @param {string} icon     - Notification icon
 * @returns {object} Action
 */
export function send(level, content, duration = 0, icon = null) {
  const notificationId = new Date().getTime() + content;

  return dispatch => {
    dispatch({
      type: 'NOTIFICATION_ADD',
      payload: {
        id: notificationId,
        content,
        icon,
        level
      }
    });

    if (duration > 0) {
      setTimeout(() => {
        dispatch({
          type: 'NOTIFICATION_REMOVE',
          payload: notificationId
        });
      }, duration);
    }

    return Promise.resolve();
  };
}

/**
 * Send a information notification
 *
 * @param {string} content  - Notification content
 * @param {int}    duration - Notification duration
 * @param {string} icon     - Notification icon
 * @returns {object} Action
 */
export function sendInfo(content, duration = 0, icon = 'info') {
  return send('info', content, duration, icon);
}

/**
 * Send a warning notification
 *
 * @param {string} content  - Notification content
 * @param {int}    duration - Notification duration
 * @param {string} icon     - Notification icon
 * @returns {object} Action
 */
export function sendWarning(content, duration = 0, icon = 'warning') {
  return send('warning', content, duration, icon);
}
