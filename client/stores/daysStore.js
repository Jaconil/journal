'use strict';

import moment from 'moment';
import BaseStore from './baseStore';

export var events = {
  FETCH_TOTAL_REMAINING_DAYS: 'days.fetchTotalRemainingDays',
  FETCH_REMAINING_DAYS: 'days.fetchRemainingDays'
};

class DaysStore extends BaseStore {
  constructor() {
    super();
    this.register(this, events.FETCH_TOTAL_REMAINING_DAYS, this.fetchTotalRemainingDays);
    this.register(this, events.FETCH_REMAINING_DAYS, this.fetchRemainingDays);

    this.totalRemainingDays = 0;
    this.remainingDays = [];
  }

  getTotalRemainingDays() {
    return this.totalRemainingDays;
  }

  getRemainingDays() {
    return this.remainingDays;
  }

  fetchTotalRemainingDays() {
    var startDate = moment().subtract(30, 'days');

    this.fetchApi({
      path: '/days',
      query: {
        status: 'notWritten',
        summary: 1,
        from: startDate.format('YYYY-MM-DD')
      }
    }).then(response => {
      this.totalRemainingDays = response.count;
      this.emitChange();
    }).catch(() => {
      // Do nothing for now
    });
  }

  fetchRemainingDays() {
    var startDate = moment().subtract(30, 'days');

    this.fetchApi({
      path: '/days',
      query: {
        status: 'notWritten',
        limit: 10,
        from: startDate.format('YYYY-MM-DD')
      }
    }).then(response => {
      this.remainingDays = response;
      this.emitChange();
    }).catch(() => {
      // Do nothing for now
    });
  }
}

export default new DaysStore();
