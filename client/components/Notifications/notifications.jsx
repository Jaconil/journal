'use strict';

import React from 'react';
import TransitionGroup from 'react-addons-css-transition-group';

import classNames from 'classnames';

import './notifications.less';

class Notifications extends React.Component {

  render() {
    var list = this.props.list.map(function(notification) {
      var notifClass = classNames('notification', 'notification-' + notification.level);
      var iconClass = classNames('fa', 'fa-2x', 'fa-border', 'fa-' + notification.icon);

      return <div key={notification.id} className={notifClass}>
        <div className="icon">
          <i className={iconClass}></i>
        </div>
        <div className="content">{notification.content}</div>
      </div>;
    });

    return <section className="notifications">
      <TransitionGroup transitionName="notification" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {list}
      </TransitionGroup>
    </section>;
  }
}

Notifications.propTypes = {
  list: React.PropTypes.array.isRequired
};

export default Notifications;
