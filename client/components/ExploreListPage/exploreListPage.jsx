'use strict';

import { connect } from 'react-redux';
import moment from 'moment';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { fetchDate } from '../../actionCreators/explore';
import { changeCurrentDayFocus } from '../../actionCreators/days.js';

/**
 * Maps state to props
 *
 * @param {object} state - State
 * @returns {object} Props
 */
function setProps(state) {
  return {
    isFetching: state.days.exploredDays.isFetching,
    days: state.days.exploredDays.list,
    isFocused: state.days.exploredDays.isFocused
  };
}

class ExploreListPage extends React.Component {

  constructor(props) {
    super(props);
    this.focusCurrentDay = this.focusCurrentDay.bind(this);
    this.closeCurrentDay = this.closeCurrentDay.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchDate(this.props.params.date));
  }

  focusCurrentDay() {
    this.props.dispatch(changeCurrentDayFocus(true));
  }

  closeCurrentDay() {
    this.props.dispatch(changeCurrentDayFocus(false));
  }

  render() {
    const days = this.props.days.map(day => {
      return (
        <Day
          data={day}
          key={day.date}
          disabled={false}
          onFocus={this.focusCurrentDay}
          onClose={this.closeCurrentDay}
          canFocus={true}
        />
      );
    });

    const selected = _.findIndex(this.props.days, day => {
      return day.date === this.props.params.date;
    });

    return (
      <section className="page explorePage">
        <DaysList
          selected={selected}
          loading={this.props.isFetching}
          focused={this.props.isFocused}
          emptyText="Aucun jour n'a été trouvé"
        >
          {days}
        </DaysList>
      </section>
    );
  }
}

ExploreListPage.propTypes = {
  days: React.PropTypes.array,
  isFetching: React.PropTypes.bool
};

export default connect(setProps)(ExploreListPage);
