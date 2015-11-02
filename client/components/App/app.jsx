'use strict';

import React from 'react';

import Header from './../Header/header.jsx';

import userStore from '../../stores/userStore';
import daysStore from '../../stores/daysStore';

var App = React.createClass({

  getInitialState: function() {
    return {
      isLogged: userStore.hasToken()
    };
  },

  componentWillMount: function() {
    userStore.addChangeListener(this.onTokenChange);
    daysStore.addChangeListener(this.onDataChange);
  },

  componentWillUnmount: function() {
    userStore.removeChangeListener(this.onTokenChange);
    daysStore.removeChangeListener(this.onDataChange);
  },

  onTokenChange: function() {
    if (!userStore.hasToken() && this.props.location.pathname !== '/login') {
      this.props.history.pushState(null, '/login');
    }

    this.setState({
      isLogged: userStore.hasToken()
    });
  },

  onDataChange: function() {
    this.forceUpdate();
  },

  render: function() {
    return (
      <div className="app-container">
        {this.state.isLogged ? <Header remainingDays={daysStore.getTotalRemainingDays()} /> : null}
        {this.props.children}
      </div>
    );
  }
});

export default App;
