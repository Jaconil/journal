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
  var notificationId = new Date().getTime() + content;

  return dispatch => {
    dispatch({
      type: 'NOTIFICATION_ADD',
      payload: {
        id: notificationId,
        content: content,
        icon: icon,
        level: level
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
export function sendInfo(content, duration = 0, icon = null) {
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
export function sendWarning(content, duration = 0, icon = null) {
  return send('warning', content, duration, icon);
}
