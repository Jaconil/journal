'use strict';

import request from 'superagent';

import BaseStore from './baseStore';

export var events = {
  INIT: 'day.init'
};

class DayStore extends BaseStore {
  constructor() {
    super();
    this.register(this, events.INIT, this.init);

    this.remainingDays = 0
  }

  getRemainingDays() {
    return this.remainingDays;
  }

  init() {
    this.fetchApi({
      path: '/days',
      query: {
        status: 'notWritten',
        summary: 1
      }
    }).then(response => {
      this.remainingDays = response.count;
      this.emitChange();
    });
  }
}

export default new DayStore();
