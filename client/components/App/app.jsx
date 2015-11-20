'use strict';

import React from 'react';

import Header from './../Header/header.jsx';

import userStore from '../../stores/userStore';
import daysStore from '../../stores/daysStore';

import './app.less';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: userStore.hasToken()
    };
  }

  componentWillMount() {
    userStore.addChangeListener(this.onTokenChange);
    daysStore.addChangeListener(this.onDataChange);
  }

  componentWillUnmount() {
    userStore.removeChangeListener(this.onTokenChange);
    daysStore.removeChangeListener(this.onDataChange);
  }

  onTokenChange() {
    if (!userStore.hasToken() && this.props.location.pathname !== '/login') {
      this.props.history.pushState(null, '/login');
    }

    this.setState({
      isLogged: userStore.hasToken()
    });
  }

  onDataChange() {
    this.forceUpdate();
  }

  render() {
    return (
      <div className="app-container">
        {this.state.isLogged ? <Header remainingDays={daysStore.getTotalRemainingDays()} /> : null}
        {this.props.children}
      </div>
    );
  }
}

export default App;
