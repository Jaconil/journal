'use strict';

import React from 'react';
import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import dayStore from '../../stores/daysStore';

import dispatcher from '../../dispatcher';

import './writePage.less';

function setProps(state) {
  return {};
}

class WritePage extends React.Component {

  constructor(props) {
    super(props);
    this.onDaysChange = this.onDaysChange.bind(this);
    this.selectNextDay = this.selectNextDay.bind(this);
    this.state = {
      remainingDays: [],
      selectedDay: 0
    };
  }

  componentDidMount() {
    dispatcher.emit(events.days.FETCH_REMAINING_DAYS);
    dayStore.addChangeListener(this.onDaysChange);
  }

  componentWillUnmount() {
    dayStore.removeChangeListener(this.onDaysChange);
  }

  onDaysChange() {
    this.setState({
      remainingDays: dayStore.getRemainingDays()
    });
  }

  selectNextDay() {
    this.setState({
      selectedDay: this.state.selectedDay + 1
    });
  }

  render() {

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
}

export default connect(setProps)(WritePage);
