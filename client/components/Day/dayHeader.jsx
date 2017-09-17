import moment from 'moment';
import classNames from 'classnames';

import 'moment/locale/fr';

class DayHeader extends React.Component {

  render() {
    const actionsIcons = {
      close: 'fa-close',
      submit: 'fa-check',
      edit: 'fa-pencil',
      explore: 'fa-eye'
    };

    const actions = _.map(this.props.actions, action => {
      return (
        <button key={action.key} onClick={action.callback}>
          <i className={classNames('fa', actionsIcons[action.key], action.key)} />
        </button>
      );
    });

    return (
      <div className="dayHeader">
        <header>
          <div className={classNames('status', _.kebabCase(this.props.status))} />
          <div className="actions">{actions}</div>
          <h1>
            <span className="full">{_.capitalize(moment(this.props.date).format('dddd DD MMMM YYYY'))}</span>
            <span className="mini">{_.capitalize(moment(this.props.date).format('ddd DD MMM YYYY'))}</span>
          </h1>
        </header>
      </div>
    );
  }
}

DayHeader.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default DayHeader;
