'use strict';

import React from 'react';
import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { getNotWrittenDays, selectNextNotWrittenDay } from '../../actionCreators/days.js';

import './writePage.less';

function setProps(state) {
  return {
    notWrittenDays: state.days.notWrittenDays.list,
    selectedDay: state.days.notWrittenDays.selected,
    isFetching: state.days.notWrittenDays.isFetching
  };
}

class WritePage extends React.Component {

  constructor(props) {
    super(props);
    this.selectNextDay = this.selectNextDay.bind(this);
    this.repaint = this.repaint.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getNotWrittenDays());
  }

  selectNextDay() {
    this.props.dispatch(selectNextNotWrittenDay());
  }

  /**
   * Forces to repaint the view, necessary when a
   * focused day is closed to realign days list
   */
  repaint() {
    this.forceUpdate();
  }

  render() {
    var days = this.props.notWrittenDays.map((day, index) => {
      return (
        <Day data={day}
            key={day.date}
            disabled={index !== this.props.selectedDay}
            onSubmit={this.selectNextDay}
            onClose={this.repaint}
        />
      );
    });

    return (
      <section className="page writePage">
        <DaysList selected={this.props.selectedDay} loading={this.props.isFetching} emptyText="Tout est à jour :)">
          {days}
        </DaysList>
      </section>
    );
  }
}

export default connect(setProps)(WritePage);
