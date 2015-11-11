'use strict';

import BaseStore from './baseStore';

export var events = {
  UPDATE: 'day.update'
};

class DayStore extends BaseStore {
  constructor() {
    super();
    this.register(this, events.UPDATE, this.updateDay);
  }

  updateDay(date, content) {

    var day = {
      date: date,
      content: content,
      status: 'written'
    };

    this.fetchApi({
      method: 'PUT',
      path: '/days/' + date,
      body: day
    }).then(response => {
      this.emitChange(date);
    }).catch(() => {
      // Do nothing for now
    });
  }
}

export default new DayStore();
