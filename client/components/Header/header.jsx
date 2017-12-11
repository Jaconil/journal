import { NavLink } from 'react-router-dom';

import './header.less';

class Header extends React.Component {

  render() {
    let writeNotification = null;

    if (this.props.notWrittenDays > 1) {
      writeNotification = <span className="notification">{this.props.notWrittenDays}</span>;
    }

    return (
      <header className="header animated fadeInDown">
        <nav className="nav-header">
          <div>
            <NavLink to="/write">
              <i className="fa fa-pencil" />
              <span className="title">Ecrire</span>
              {writeNotification}
            </NavLink>
            <NavLink to="/explore">
              <i className="fa fa-eye" />
              <span className="title">Explorer</span>
            </NavLink>
            <NavLink to="/search">
              <i className="fa fa-search" />
              <span className="title">Rechercher</span>
            </NavLink>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  notWrittenDays: PropTypes.number.isRequired,
};

export default Header;
