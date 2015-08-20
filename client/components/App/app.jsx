'use strict';

import React from 'react';
import { Navigation } from 'react-router';

import Header from './../Header/header.jsx';

import userStore from '../../stores/userStore';
import dayStore from '../../stores/dayStore';

var App = React.createClass({

  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      isLogged: userStore.hasToken()
    };
  },

  componentDidMount: function() {
    userStore.addChangeListener(this.onTokenChange);
    dayStore.addChangeListener(this.onDataChange);
  },

  componentWillUnmount: function() {
    userStore.removeChangeListener(this.onTokenChange);
    dayStore.removeChangeListener(this.onDataChange);
  },

  onTokenChange: function() {
    if (!userStore.hasToken()) {
      this.transitionTo('login');
    }

    this.setState({isLogged: userStore.hasToken()});
  },

  onDataChange: function() {
    this.forceUpdate();
  },

  render: function() {
    return (
      <div className="app-container">
        {this.state.isLogged ? <Header remainDays={dayStore.getRemainingDays()} /> : null}
        {this.props.children}
      </div>
    );
  }
});

export default App;
