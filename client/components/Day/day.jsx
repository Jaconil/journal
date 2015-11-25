'use strict';

import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

import dayStore from '../../stores/dayStore';
import dispatcher from '../../dispatcher';

import './day.less';

import 'moment/locale/fr';

function setProps(state) {
  return {};
}

class Day extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      day: this.props.data
    };
  }

  componentWillMount() {
    dayStore.addChangeListener(this.onChange, this.state.day.date);
  }

  componentWillUnmount() {
    dayStore.removeChangeListener(this.onChange, this.state.day.date);
  }

  onChange() {
    this.setState({
      day: dayStore.getData()
    });
  }

  handleClick() {
    dispatcher.emit(events.day.UPDATE, this.state.day.date, this.refs.content.value);
    this.props.onSubmit();
  }

  render() {
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
}

Day.propTypes = {
  data: React.PropTypes.shape({
    date: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  }).isRequired,
  disabled: React.PropTypes.bool,
  onSubmit: React.PropTypes.func
};

export default connect(setProps)(Day);
