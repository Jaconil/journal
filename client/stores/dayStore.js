'use strict';

import _ from 'lodash';
import request from 'superagent';
import moment from 'moment';

import BaseStore, { events as baseEvents } from './baseStore';
import dispatcher from '../dispatcher';

export var events = {
  INIT: 'day.init'
};

class DayStore extends BaseStore {
  constructor() {
    super();
    dispatcher.on(events.INIT, _.bind(this.init, this));

    this.remainDays = 0
  }

  getRemainDays() {
    return this.remainDays;
  }

  init() {
    this.fetchApi({
      path: '/days',
      query: {count: 1}
    }, function(err, response) {
      if (response.ok) {

        var firstDay = moment(response.body.startDate);
        var totalDays = moment().startOf('day').diff(firstDay, 'days');

        this.remainDays = totalDays - response.body.count;

        //if (this.remainDays === 0 && this.selected === 'write') {
        //  this.fire('noWrite');
        //}

        this.emitChange();
      }
    }.bind(this));
  }
}

export default new DayStore();
