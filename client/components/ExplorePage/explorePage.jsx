'use strict';

import { connect } from 'react-redux';
import moment from 'moment';

import { submitDate } from '../../actionCreators/explore';

import './explorePage.less';

const KEY_ENTER = 13;
const FIRST_DAY = window.Journal.firstDay

class ExplorePage extends React.Component {

  constructor(props) {
    super(props);
    this.onDatePickerChange = this.onDatePickerChange.bind(this);
    this.onDatePickerKeyDown = this.onDatePickerKeyDown.bind(this);
  }

  onDatePickerChange(event) {
    const submittedDate = moment(this.datePicker.value, 'YYYY-MM-DD', true);

    if (submittedDate.isValid() && submittedDate.isSameOrAfter(FIRST_DAY)) {
      event.preventDefault();
      this.props.dispatch(submitDate(this.datePicker.value));
    }
  }

  onDatePickerKeyDown(event) {
    if (event.keyCode === KEY_ENTER && !event.shiftKey) {
      event.preventDefault();
      this.props.dispatch(submitDate(this.datePicker.value));
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

export default connect()(ExplorePage);
