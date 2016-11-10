'use strict';

import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { getNotWrittenDays, selectNextNotWrittenDay, changeCurrentDayFocus } from '../../actionCreators/days.js';

import './writePage.less';

/**
 * Maps state to props
 *
 * @param {object} state - State
 * @returns {object} Props
 */
function setProps(state) {
  return {
    notWrittenDays: state.days.notWrittenDays.list,
    selectedDay: state.days.notWrittenDays.selected,
    isFetching: state.days.notWrittenDays.isFetching,
    isFocused: state.days.notWrittenDays.isFocused
  };
}

class WritePage extends React.Component {

  constructor(props) {
    super(props);
    this.selectNextDay = this.selectNextDay.bind(this);
    this.focusCurrentDay = this.focusCurrentDay.bind(this);
    this.closeCurrentDay = this.closeCurrentDay.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getNotWrittenDays());
  }

  selectNextDay() {
    this.props.dispatch(selectNextNotWrittenDay());
  }

  focusCurrentDay() {
    this.props.dispatch(changeCurrentDayFocus(true));
  }

  /**
   * Forces to repaint the view, necessary when a
   * focused day is closed to realign days list
   */
  closeCurrentDay() {
    this.props.dispatch(changeCurrentDayFocus(false));
    this.forceUpdate();
  }

  render() {
    const days = this.props.notWrittenDays.map((day, index) => {
      return (
        <Day
          data={day}
          key={day.date}
          disabled={index !== this.props.selectedDay}
          onFocus={this.focusCurrentDay}
          onSubmit={this.selectNextDay}
          onClose={this.closeCurrentDay}
          canFocus={this.props.isFocused}
        />
      );
    });
console.log('render writePage', this.props.isFocused);
    return (
      <section className="page writePage">
        <DaysList
          selected={this.props.selectedDay}
          loading={this.props.isFetching}
          focused={this.props.isFocused}
          emptyText="Tout est à jour :)"
        >
          {days}
        </DaysList>
      </section>
    );
  }
}

WritePage.propTypes = {
  isFetching: React.PropTypes.bool,
  isFocused: React.PropTypes.bool,
  notWrittenDays: React.PropTypes.array,
  selectedDay: React.PropTypes.number
};

export default connect(setProps)(WritePage);
