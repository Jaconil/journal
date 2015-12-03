'use strict';

import React from 'react';
import { Link } from 'react-router';

import './header.less';

class Header extends React.Component {

  render() {
    return (
      <header className="header animated fadeInDown">
        <nav className="nav-header">
          <ul>
            <li className="active">
              <Link to="write">
                <i className="fa fa-pencil"></i>
                <span>Ecrire</span>
                <span className="notification">{this.props.notWrittenDays}</span>
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
  notWrittenDays: React.PropTypes.number.isRequired
};

export default Header;
