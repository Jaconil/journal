'use strict';

import moment from 'moment';
import { push } from 'react-router-redux';
import { sendWarning } from './notifications';

/**
 * Submit a date
 *
 * @returns {object} Action
 */
export function submitDate(date) {
  return dispatch => {
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
      return dispatch(push('/explore/' + date));
    }

    dispatch(sendWarning('La date est invalide', NOTIFICATION_DURATION, 'warning'));
  };
}
