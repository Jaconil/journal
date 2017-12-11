import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { sendWarning } from '../../actionCreators/notifications';

import './explorePage.less';

const KEY_ENTER = 13;
const FIRST_DAY = window.Journal.firstDay;
const NOTIFICATION_DURATION = 5000; // 5s

class ExplorePage extends React.Component {

  constructor(props) {
    super(props);
    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.onDatePickerKeyDown = this.onDatePickerKeyDown.bind(this);
  }

  submitDate() {
    const submittedDate = moment(this.datePicker.value, 'YYYY-MM-DD', true);

    if (submittedDate.isValid() && submittedDate.isSameOrAfter(FIRST_DAY)) {
      return this.props.history.push(`/explore/${this.datePicker.value}`);
    }

    return this.props.dispatch(sendWarning('La date est invalide', NOTIFICATION_DURATION, 'warning'));
  }

  onDatePickerChange(event) {
    const submittedDate = moment(this.datePicker.value, 'YYYY-MM-DD', true);

    if (submittedDate.isValid() && submittedDate.isSameOrAfter(FIRST_DAY)) {
      event.preventDefault();
      this.submitDate();
    }
  }

  onDatePickerKeyDown(event) {
    if (event.keyCode === KEY_ENTER && !event.shiftKey) {
      event.preventDefault();
      this.submitDate();
    }
  }

  render() {
    return (
      <section className="page explorePage">
        <div className="datepickerContainer">
          <div className="datepicker animated fadeIn">
            <input
              type="date"
              placeholder="jj/mm/aaaa"
              min={FIRST_DAY}
              max={moment().format('YYYY-MM-DD')}
              autoFocus
              ref={element => this.datePicker = element}
              onChange={this.onDatePickerChange}
              onKeyDown={this.onDatePickerKeyDown}
            />
          </div>
        </div>
      </section>
    );
  }
}

ExplorePage.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(connect()(ExplorePage));
