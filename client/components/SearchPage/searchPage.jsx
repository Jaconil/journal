'use strict';

import React from 'react';
import { connect } from 'react-redux';

import './searchPage.less';

function setProps(state) {
  return {};
}

class SearchPage extends React.Component {

  render() {
    return (
      <section className="page searchPage">
      </section>
    );
  }
}

export default connect(setProps)(SearchPage);
