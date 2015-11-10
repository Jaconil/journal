'use strict';

import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

import dayStore from '../../stores/dayStore';
import dispatcher from '../../dispatcher';

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

  getInitialState: function() {
    return {
      day: this.props.data
    };
  },

  componentWillMount: function() {
    dayStore.addChangeListener(this.onChange, this.state.day.date);
  },

  componentWillUnmount: function() {
    dayStore.removeChangeListener(this.onChange, this.state.day.date);
  },

  onChange: function() {
    this.setState({
      day: dayStore.getData()
    });
  },

  handleClick: function() {
    dispatcher.emit(events.day.UPDATE, this.state.day.date, this.refs.content.value);
    this.props.onSubmit();
  },

  render: function() {
    var boxClasses = classNames('day', { disabled: this.props.disabled });
    var statusClasses = classNames('status', _.kebabCase(this.state.day.status));

    var actions = null;
    var content = null;

    if (!this.props.disabled && this.state.day.status === 'notWritten') {
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
          <h1>{_.capitalize(moment(this.state.day.date).format('dddd DD MMMM YYYY'))}</h1>
        </header>
        {actions}
        {content}
      </section>
    );
  }
});

export default Day;
