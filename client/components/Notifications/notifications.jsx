import { TransitionGroup, CSSTransition } from 'react-transition-group';

import classNames from 'classnames';

import './notifications.less';

class Notifications extends React.Component {

  render() {
    const list = this.props.list.map(notification => {
      const notifClass = classNames('notification', 'notification-' + notification.level);
      const iconClass = classNames('fa', 'fa-2x', 'fa-border', 'fa-' + notification.icon);

      return (
        <CSSTransition
          key={notification.id}
          classNames="notification"
          timeout={{ enter: 500, exit: 300 }}
        >
          <div className={notifClass}>
            <div className="icon">
              <i className={iconClass} />
            </div>
            <div className="content">{notification.content}</div>
          </div>
        </CSSTransition>
      );
    });

    return (
      <section className="notifications">
        <TransitionGroup>
          {list}
        </TransitionGroup>
      </section>
    );
  }
}

Notifications.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Notifications;
