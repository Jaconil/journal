'use strict';

import { connect } from 'react-redux';
import moment from 'moment';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { searchDates } from '../../actionCreators/search';

/**
 * Maps state to props
 *
 * @param {object} state - State
 * @returns {object} Props
 */
function setProps(state) {
  return {
    isFetching: state.days.searchResults.isFetching,
    days: state.days.searchResults.list
  };
}

class SearchResultsPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(searchDates(this.props.params.term));
  }

  render() {
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
      return day.date === this.props.params.date;
    });

    return (
      <section className="page searchPage">
        <DaysList
          selected={selected}
          loading={this.props.isFetching}
          emptyText="Aucun jour n'a été trouvé"
        >
          {days}
        </DaysList>
      </section>
    );
  }
}

SearchResultsPage.propTypes = {
  days: React.PropTypes.array,
  isFetching: React.PropTypes.bool
};

export default connect(setProps)(SearchResultsPage);
