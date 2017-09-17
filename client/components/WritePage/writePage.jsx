import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { getNotWrittenDays, selectNextNotWrittenDay } from '../../actionCreators/days.js';

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
    isFetching: state.days.notWrittenDays.isFetching
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
    const days = this.props.notWrittenDays.map((day, index) => {
      return (
        <Day
          data={day}
          key={day.date}
          disabled={index !== this.props.selectedDay}
          isFocused={index === this.props.selectedDay}
          onSubmit={this.selectNextDay}
        />
      );
    });

    return (
      <section className="page writePage">
        <DaysList
          selected={this.props.selectedDay}
          loading={this.props.isFetching}
          emptyText="Tout est à jour :)"
        >
          {days}
        </DaysList>
      </section>
    );
  }
}

WritePage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  notWrittenDays: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedDay: PropTypes.number.isRequired
};

export default connect(setProps)(WritePage);
