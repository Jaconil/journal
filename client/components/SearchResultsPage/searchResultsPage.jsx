import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { searchDates } from '../../actionCreators/days';

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
          isExplorable
        />
      );
    });

    return (
      <section className="page searchPage">
        <DaysList
          selected={0}
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
  days: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

export default connect(setProps)(SearchResultsPage);
