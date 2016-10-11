'use strict';

import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { submitDate, clearExploredDays } from '../../actionCreators/explore';

import './explorePage.less';

const KEY_ENTER = 13;

/**
 * Maps state to props
 *
 * @param {object} state - State
 * @returns {object} Props
 */
function setProps(state) {
  return {
    currentDay: state.days.exploredDays.currentDay,
    isFetching: state.days.exploredDays.isFetching,
    days: state.days.exploredDays.list
  };
}

class ExplorePage extends React.Component {

  constructor(props) {
    super(props);
    this.onDatePickerSubmit = this.onDatePickerSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(clearExploredDays());
  }

  onDatePickerSubmit(event) {
    if (event.keyCode === KEY_ENTER && !event.shiftKey) {
      event.preventDefault();
      this.props.dispatch(submitDate(this.datePicker.value));
    }
  }

  render() {
    let content = null;

    if (this.props.currentDay) {
      const days = this.props.days.map(day => {
        return (
          <Day
            data={day}
            key={day.date}
            disabled={false}
          />
        );
      });

      const selected = _.findIndex(this.props.days, day => {
        return day.date === this.props.currentDay;
      });

      content = (
        <DaysList
          selected={selected}
          loading={this.props.isFetching}
          emptyText="Aucun jour n'a été trouvé"
        >
          {days}
        </DaysList>
      );
    } else {
      content = (
        <div className="datepickerContainer">
          <div className="datepicker animated fadeIn">
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              autoFocus
              ref={element => this.datePicker = element}
              onKeyDown={this.onDatePickerSubmit}
            />
          </div>
        </div>
      );
    }

    return (
      <section className="page explorePage">
        {content}
      </section>
    );
  }
}

ExplorePage.propTypes = {
  currentDay: React.PropTypes.string,
  days: React.PropTypes.array,
  isFetching: React.PropTypes.bool
};

export default connect(setProps)(ExplorePage);
