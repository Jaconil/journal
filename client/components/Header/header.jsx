'use strict';

import React from 'react';
import { Link } from 'react-router';

import dispatcher from '../../dispatcher';

import './header.less';

class Header extends React.Component {

  componentWillMount() {
    dispatcher.emit(events.days.FETCH_TOTAL_REMAINING_DAYS);
  }

  render() {
    return (
      <header className="header animated fadeInDown">
        <nav className="nav-header">
          <ul>
            <li className="active">
              <Link to="write">
                <i className="fa fa-pencil"></i>
                <span>Ecrire</span>
                <span className="notification">{this.props.remainingDays}</span>
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
}

Header.propTypes = {
  remainingDays: React.PropTypes.number.isRequired
};

export default Header;
