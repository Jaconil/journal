'use strict';

import React from 'react';

import classNames from 'classnames';

import './notifications.less';

class Notifications extends React.Component {

  render() {
    var list = this.props.list.map(function(notification) {
      if (!notification.icon) {
        notification.icon = '';
      }

      var notifClass = classNames('notification', 'notification-' + notification.level);
      var iconClass = classNames('fa', 'fa-2x', 'fa-border', 'fa-' + notification.icon);

      return <div key={notification.id} className={notifClass}>
        <div className="icon">
          <i className={iconClass}></i>
        </div>
        {notification.content}
      </div>;
    });

    return <section className="notifications">{list}</section>;
  }
}

Notifications.propTypes = {
  list: React.PropTypes.array.isRequired
};

export default Notifications;
