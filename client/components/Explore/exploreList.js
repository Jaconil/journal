import { connect } from 'react-redux';

import Day from './../Day/day.jsx';
import DaysList from './../DaysList/daysList.jsx';

import { fetchDate } from '../../actionCreators/days';

class ExploreList extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchDate(this.props.match.params.date));
  }

  render() {
    const days = this.props.days.map(day => {
      return (
        <Day
          data={day}
          key={day.date}
        />
      );
    });

    const selected = _.findIndex(this.props.days, day => {
      return day.date === this.props.match.params.date;
    });

    return (
      <DaysList
        selected={selected}
        loading={this.props.isFetching}
        emptyText="Aucun jour n'a été trouvé"
      >
        {days}
      </DaysList>
    );
  }
}

ExploreList.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(state => ({
  isFetching: state.days.exploredDays.isFetching,
  days: state.days.exploredDays.list
}))(ExploreList);
