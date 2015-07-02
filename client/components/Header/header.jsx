'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="nav-header">
          <ul>
            <li className="active">
              <Link to="write">
                <i className="fa fa-pencil"></i>
                Ecrire
                <span className="notification">1</span>
              </Link>
            </li>
            <li className="">
              <Link to="explore">
                <i className="fa fa-eye"></i>
                Explorer
              </Link>
            </li>
            <li className="">
              <Link to="search">
                <i className="fa fa-search"></i>
                Rechercher
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
