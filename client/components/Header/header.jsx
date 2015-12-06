'use strict';

import React from 'react';
import { Link } from 'react-router';

import classNames from 'classnames';

import './header.less';

class Header extends React.Component {

  render() {
    var writeClass = classNames({ active: this.props.route.indexOf('write') > -1 });
    var exploreClass = classNames({ active: this.props.route.indexOf('explore') > -1 });
    var searchClass = classNames({ active: this.props.route.indexOf('search') > -1 });

    return (
      <header className="header animated fadeInDown">
        <nav className="nav-header">
          <ul>
            <li className={writeClass}>
              <Link to="write">
                <i className="fa fa-pencil"></i>
                <span>Ecrire</span>
                <span className="notification">{this.props.notWrittenDays}</span>
              </Link>
            </li>
            <li className={exploreClass}>
              <Link to="explore">
                <i className="fa fa-eye"></i>
                <span>Explorer</span>
              </Link>
            </li>
            <li className={searchClass}>
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
  notWrittenDays: React.PropTypes.number.isRequired,
  route: React.PropTypes.string.isRequired
};

export default Header;
