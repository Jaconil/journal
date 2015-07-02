'use strict';

import React from 'react';
import { Router } from 'react-router';

import Header from './../Header/header.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
