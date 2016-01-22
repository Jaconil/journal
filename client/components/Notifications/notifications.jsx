'use strict';

import React from 'react';

import './notifications.less';

class Notifications extends React.Component {

  render() {
    return (
      <section className="notifications">
        <div className="notification">
          <div className="icon">
            <i className="fa fa-sign-out fa-2x fa-border"></i>
          </div>
          Vous êtes déconnecté
        </div>
        <div className="notification notification-error">
          <div className="icon">
            <i className="fa fa-exclamation-triangle fa-2x fa-border"></i>
          </div>
          Echec de l'enregistrement
        </div>
      </section>
    );
  }
}

Notifications.propTypes = {
  list: React.PropTypes.array.isRequired
};

export default Notifications;
