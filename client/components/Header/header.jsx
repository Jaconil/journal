'use strict';

import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <nav className="nav-header">
          <ul>
            <li className="active">
              <Link to="write">
                <i className="fa fa-pencil"></i>
                <span>Ecrire</span>
                <span className="notification">1</span>
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
