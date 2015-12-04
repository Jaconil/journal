'use strict';

import React from 'react';
import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { getNotWrittenDays, selectNextNotWrittenDay } from '../../actionCreators/days.js';

import './writePage.less';

function setProps(state) {
  return {
    notWrittenDays: state.days.notWrittenDays,
    selectedDay: state.days.notWrittenSelectedDay
  };
}

class WritePage extends React.Component {

  constructor(props) {
    super(props);
    this.selectNextDay = this.selectNextDay.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getNotWrittenDays());
  }

  selectNextDay() {
    this.props.dispatch(selectNextNotWrittenDay());
  }

  render() {
    var days = this.props.notWrittenDays.map((day, index) => {
      if (index === this.props.selectedDay) {
        return (<Day data={day} key={day.date} onSubmit={this.selectNextDay} />);
      }

      return (<Day data={day} key={day.date} disabled />);
    });

    return (
      <section className="page writePage animated fadeIn">
        <DaysList selected={this.props.selectedDay}>
          {days}
        </DaysList>
      </section>
    );
  }
}

export default connect(setProps)(WritePage);
