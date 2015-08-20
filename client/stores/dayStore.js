'use strict';

import request from 'superagent';
import moment from 'moment';

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
      query: {count: 1}
    }).then(response => {
      var firstDay = moment(response.startDate);
      var totalDays = moment().startOf('day').diff(firstDay, 'days');

      this.remainingDays = totalDays - response.count;
      this.emitChange();
    });
  }
}

export default new DayStore();
