'use strict';

import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

import Textarea from 'react-textarea-autosize';

import { update } from '../../actionCreators/day.js';

import './day.less';

import 'moment/locale/fr';

function setProps(state) {
  return {};
}

class Day extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleClick() {
    this.props.dispatch(update(this.props.data.date, this.refs.content.value));
    this.props.onSubmit();
  }

  handleEnter(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      this.handleClick();
    }
  }

  handleFocus() {
    if (!this.props.disabled && this.props.data.status === 'notWritten') {
      this.refs.content.focus();
    }
  }

  componentDidMount() {
    this.handleFocus();
  }

  componentDidUpdate() {
    this.handleFocus();
  }

  render() {
    var boxClasses = classNames('day', { disabled: this.props.disabled });
    var statusClasses = classNames('status', _.kebabCase(this.props.data.status));

    var actions = null;
    var content = null;

    if (!this.props.disabled && this.props.data.status === 'notWritten') {
      actions = <div className="actions">
        <button onClick={this.handleClick}><i className="fa fa-check"></i></button>
      </div>;
    }

    if (this.props.data.status === 'notWritten') {
      content = <Textarea ref="content" disabled={this.props.disabled} onKeyUp={this.handleEnter}></Textarea>;
    } else {
      content = <div className="text">{this.props.data.content}</div>;
    }

    return (
      <section className={boxClasses}>
        <header>
          <div className={statusClasses}></div>
          {actions}
          <h1>
            <span className="full">{_.capitalize(moment(this.props.data.date).format('dddd DD MMMM YYYY'))}</span>
            <span className="mini">{_.capitalize(moment(this.props.data.date).format('ddd DD MMM YYYY'))}</span>
          </h1>
        </header>
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
