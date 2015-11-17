'use strict';

import React from 'react';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import dayStore from '../../stores/daysStore';

import dispatcher from '../../dispatcher';

import './writePage.less';

var WritePage = React.createClass({

  getInitialState: function() {
    return {
      remainingDays: [],
      selectedDay: 0
    };
  },

  componentDidMount: function() {
    dispatcher.emit(events.days.FETCH_REMAINING_DAYS);

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

    var days = this.state.remainingDays.map((day, index) => {

      if (index === this.state.selectedDay) {
        return (
          <Day data={day} key={day.date} onSubmit={this.selectNextDay} />
        );
      }

      return (
        <Day data={day} key={day.date} disabled />
      );

    });

    return (
      <section className="page writePage animated fadeIn">
        <DaysList selected={this.state.selectedDay}>
          {days}
        </DaysList>
      </section>
    );
  }
});

export default WritePage;
