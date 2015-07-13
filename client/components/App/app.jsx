'use strict';

import React from 'react';
import Header from './../Header/header.jsx';

var App = React.createClass({
  render: function() {
    return (
      <div className="app-container">
        {(this.props.location.pathname !== '/login') ? <Header /> : null}
        {this.props.children}
      </div>
    );
  }
});

export default App;
