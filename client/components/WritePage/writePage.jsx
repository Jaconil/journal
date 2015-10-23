'use strict';

import React from 'react';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import dayStore from '../../stores/dayStore';

import { events as dayEvents } from '../../stores/dayStore';
import dispatcher from '../../dispatcher';

var WritePage = React.createClass({

  getInitialState: function() {
    return {
      remainingDays: [],
      selectedDay: 0
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
    this.setState({
      remainingDays: dayStore.getRemainingDays()
    });
  },

  selectNextDay: function() {
    this.setState({
      selectedDay: this.state.selectedDay + 1
    });
  },

  render: function() {

    var days = this.state.remainingDays.map((day) => {
      return (
        <Day status="notWritten" date={day.date} key={day.date} onSubmit={this.selectNextDay} />
      );
    });

    return (
      <section className="page writePage">
        <DaysList selected={this.state.selectedDay}>
          {days}
        </DaysList>
      </section>
    );
  }
});

export default WritePage;
