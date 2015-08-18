'use strict';

import React from 'react';
import { Link } from 'react-router';

import { events as dayEvents } from '../../stores/dayStore';
import dispatcher from '../../dispatcher';

var Header = React.createClass({

  propTypes: {
    remainDays: React.PropTypes.number.isRequired
  },

  componentDidMount: function() {
    dispatcher.emit(dayEvents.INIT);
  },

  render: function() {
    return (
      <header className="animated fadeInDown">
        <nav className="nav-header">
          <ul>
            <li className="active">
              <Link to="write">
                <i className="fa fa-pencil"></i>
                <span>Ecrire</span>
                <span className="notification">{this.props.remainDays}</span>
              </Link>
            </li>
            <li className="">
              <Link to="explore">
                <i className="fa fa-eye"></i>
                <span>Explorer</span>
              </Link>
            </li>
            <li className="">
              <Link to="search">
                <i className="fa fa-search"></i>
                <span>Rechercher</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
});

export default Header;
