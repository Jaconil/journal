'use strict';

import _ from 'lodash';
import request from 'superagent';

import BaseStore, { events as baseEvents } from './baseStore';
import Dispatcher from '../dispatcher';

export var events = {
  INIT: 'day.init'
};

class DayStore extends BaseStore {
  constructor() {
    super();
    Dispatcher.on(events.INIT, _.bind(this.init, this));
  }

  getRemainDays() {
    return 0;
  }

  init() {
    console.log('day init');
    this.fetchApi({
      path: '/days',
      query: {count: 1}
    }, function(err, response) {
      if (response.ok) {
        console.log(response);
        this.emitChange();
      }
    }.bind(this));
  }
}

export default new DayStore();
