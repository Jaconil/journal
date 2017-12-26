import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { searchDates } from '../../actionCreators/days';

class SearchResults extends React.Component {

  componentWillMount() {
    this.props.dispatch(searchDates(this.props.match.params.term));
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
      <DaysList
        selected={0}
        loading={this.props.isFetching}
        emptyText="Aucun jour n'a été trouvé"
      >
        {days}
      </DaysList>
    );
  }
}

SearchResults.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(state => ({
  isFetching: state.days.searchResults.isFetching,
  days: state.days.searchResults.list
}))(SearchResults);
