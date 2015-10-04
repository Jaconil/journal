'use strict';

import BaseStore from './baseStore';

export var events = {
  FETCH_TOTAL_REMAINING_DAYS: 'day.fetchTotalRemainingDays',
  FETCH_REMAINING_DAYS: 'day.fetchRemainingDays'
};

class DayStore extends BaseStore {
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
    this.fetchApi({
      path: '/days',
      query: {
        status: 'notWritten',
        summary: 1
      }
    }).then(response => {
      this.totalRemainingDays = response.count;
      this.emitChange();
    });
  }

  fetchRemainingDays() {
    this.fetchApi({
      path: '/days',
      query: {
        status: 'notWritten',
        limit: 10
      }
    }).then(response => {
      this.remainingDays = response;
      this.emitChange();
    });
  }
}

export default new DayStore();
