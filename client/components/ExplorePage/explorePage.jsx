'use strict';

import React from 'react';
import { connect } from 'react-redux';

import './explorePage.less';

function setProps(state) {
  return {};
}

class ExplorePage extends React.Component {

  render() {
    return (
      <section className="page explorePage">
      </section>
    );
  }
}

export default connect(setProps)(ExplorePage);