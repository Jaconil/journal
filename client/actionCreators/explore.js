import moment from 'moment';
import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

const NOTIFICATION_DURATION = 5000; // 5s

/**
 * Submit a date
 *
 * @param {string} date - Date submitted
 * @returns {object} Action
 */
export function submitDate(date) {
  return dispatch => {
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
      return dispatch(push('/explore/' + date));
    }

    return dispatch(sendWarning('La date est invalide', NOTIFICATION_DURATION, 'warning'));
  };
}
