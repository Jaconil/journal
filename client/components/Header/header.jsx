'use strict';

import { Link } from 'react-router';

import classNames from 'classnames';

import './header.less';

class Header extends React.Component {

  render() {
    const writeClass = classNames({ active: this.props.route.indexOf('write') > -1 });
    const exploreClass = classNames({ active: this.props.route.indexOf('explore') > -1 });
    const searchClass = classNames({ active: this.props.route.indexOf('search') > -1 });
    let writeNotification = null;

    if (this.props.notWrittenDays > 1) {
      writeNotification = <span className="notification">{this.props.notWrittenDays}</span>;
    }

    return (
      <header className="header animated fadeInDown">
        <nav className="nav-header">
          <ul>
            <li className={writeClass}>
              <Link to="/write">
                <i className="fa fa-pencil"></i>
                <span className="title">Ecrire</span>
                {writeNotification}
              </Link>
            </li>
            <li className={exploreClass}>
              <Link to="/explore">
                <i className="fa fa-eye"></i>
                <span className="title">Explorer</span>
              </Link>
            </li>
            <li className={searchClass}>
              <Link to="/search">
                <i className="fa fa-search"></i>
                <span className="title">Rechercher</span>
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
