'use strict';

import React from 'react';

var Day = React.createClass({

  render: function() {
    return (
      <section className="day write">
        <header>
          <div className="status not-written"></div>
          <h1>{this.props.date}</h1>
        </header>
        <div className="actions">
          <button><i className="fa fa-close"></i></button>
          <button><i className="fa fa-check"></i></button>
        </div>
        <textarea></textarea>
      </section>
    );
  }
});

export default Day;