'use strict';

import React from 'react';

import Day from './../Day/day.jsx';

import dayStore from '../../stores/dayStore';

import { events as dayEvents } from '../../stores/dayStore';
import dispatcher from '../../dispatcher';

var WritePage = React.createClass({

  getInitialState: function() {
    return {
      remainingDays: []
    };
  },

  componentDidMount: function() {
    dispatcher.emit(dayEvents.FETCH_REMAINING_DAYS);

    dayStore.addChangeListener(this.onDaysChange);
  },

  componentWillUnmount: function() {
    dayStore.removeChangeListener(this.onDaysChange);
  },

  onDaysChange: function() {
    this.setState({remainingDays: dayStore.getRemainingDays()});
  },

  render: function() {

    var days = this.state.remainingDays.map(function(day) {
      return (
        <Day status="notWritten" date={day.date} key={day.date} />
      );
    });

    return (
      <section className="page writePage">
        {days}
      </section>
    );
  }
});

export default WritePage;
