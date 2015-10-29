'use strict';

import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

import 'moment/locale/fr';

var Day = React.createClass({

  propTypes: {
    data: React.PropTypes.shape({
      date: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired
    }).isRequired,
    disabled: React.PropTypes.bool,
    onSubmit: React.PropTypes.func
  },

  handleClick: function() {
    dispatcher.emit(dayEvents.UPDATEDAY, this.refs.content.value);
    this.props.onSubmit();
  },

  render: function() {
    var boxClasses = classNames('day', { disabled: this.props.disabled });
    var statusClasses = classNames('status', _.kebabCase(this.props.data.status));

    var actions = null;
    var content = null;

    if (!this.props.disabled && this.props.data.status === 'notWritten') {
      actions = <div className="actions">
        <button><i className="fa fa-close"></i></button>
        <button onClick={this.handleClick}><i className="fa fa-check"></i></button>
      </div>;
    }

    if (this.props.data.status === 'notWritten') {
      content = <textarea ref="content"></textarea>;
    }

    return (
      <section className={boxClasses}>
        <header>
          <div className={statusClasses}></div>
          <h1>{_.capitalize(moment(this.props.data.date).format('dddd DD MMMM YYYY'))}</h1>
        </header>
        {actions}
        {content}
      </section>
    );
  }
});

export default Day;
