'use strict';

import React from 'react';
import { Navigation } from 'react-router';

import Header from './../Header/header.jsx';

import UserStore from '../../stores/userStore';

var App = React.createClass({

  mixins: [ Navigation ],

  getInitialState: function() {
    return {
      isLogged: UserStore.isLogged()
    };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this.onTokenChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this.onTokenChange);
  },

  onTokenChange: function() {
    console.log('token change');
    if (this.state.isLogged && !UserStore.isLogged()) {
      console.log('redirection login');
      this.transitionTo('login');
    }

    this.setState({isLogged: UserStore.isLogged()});
  },

  render: function() {
    return (
      <div className="app-container">
        {UserStore.isLogged() ? <Header /> : null}
        {this.props.children}
      </div>
    );
  }
});

export default App;
