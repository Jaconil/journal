'use strict';

import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

import 'moment/locale/fr';

var Day = React.createClass({

  propTypes: {
    status: React.PropTypes.oneOf([
      'toWrite'
    ]).isRequired,
    data: React.PropTypes.shape({
      date: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired
    }).isRequired,
    onSubmit: React.PropTypes.func
  },

  handleClick: function() {
    this.props.onSubmit();
  },

  render: function() {
    var statusClasses = classNames(
      'status',
      _.kebabCase(this.props.data.status)
    );

    return (
      <section className="day write">
        <header>
          <div className={statusClasses}></div>
          <h1>{moment(this.props.data.date).format('dddd DD MMMM YYYY')}</h1>
        </header>
        <div className="actions">
          <button><i className="fa fa-close"></i></button>
          <button onClick={this.handleClick}><i className="fa fa-check"></i></button>
        </div>
        <textarea></textarea>
      </section>
    );
  }
});

export default Day;
