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

function setProps() {
  return {};
}

class Day extends React.Component {

  constructor(props) {
    super(props);
    this.onActionsClose = this.onActionsClose.bind(this);
    this.onActionsSubmit = this.onActionsSubmit.bind(this);
    this.onActionsKey = this.onActionsKey.bind(this);

    this.onConfirmationBack = this.onConfirmationBack.bind(this);
    this.onConfirmationSubmit = this.onConfirmationSubmit.bind(this);
    this.onConfirmationKey = this.onConfirmationKey.bind(this);

    this.onTextareaFocus = this.onTextareaFocus.bind(this);

    this.handleFocus = this.handleFocus.bind(this);

    this.state = { confirmation: false };
  }

  onActionsClose() {
    this.refs.container.classList.remove('focused');
  }

  onActionsSubmit() {
    document.querySelector('body').addEventListener('keydown', this.onConfirmationKey);
    this.setState({ confirmation: true });
  }

  onActionsKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.onActionsSubmit();
    }
  }

  onConfirmationBack() {
    document.querySelector('body').removeEventListener('keydown', this.onConfirmationKey);
    this.setState({ confirmation: false });
  }

  onConfirmationSubmit() {
    this.onConfirmationBack();
    this.onActionsClose();

    this.props.dispatch(update(this.props.data.date, this.refs.content.value))
      .then(this.props.onSubmit);
  }

  onConfirmationKey(event) {
    event.preventDefault();

    if (event.keyCode === 27) {
      this.onConfirmationBack();
    } else if (event.keyCode === 13) {
      this.onConfirmationSubmit();
    }
  }

  onTextareaFocus() {
    this.refs.container.classList.add('focused');
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
    var boxClasses = classNames('day', {
      disabled: this.props.disabled,
      confirmation: this.state.confirmation,
      focused: !this.props.disabled && this.props.data.status === 'notWritten'
    });
    var statusClasses = classNames('status', _.kebabCase(this.props.data.status));

    var actions = null;
    var content = null;
    var confirmationOverlay = null;

    if (this.state.confirmation) {
      confirmationOverlay = <div className="confirmationOverlay">
        <button onClick={this.onConfirmationBack}><i className="fa fa-close fa-2x"></i></button>
        <button onClick={this.onConfirmationSubmit}><i className="fa fa-check fa-2x"></i></button>
      </div>;
    }

    if (!this.props.disabled && !this.state.confirmation && this.props.data.status === 'notWritten') {
      actions = <div className="actions">
        <button onClick={this.onActionsClose}><i className="close fa fa-close"></i></button>
        <button onClick={this.onActionsSubmit}><i className="submit fa fa-check"></i></button>
      </div>;
    }

    if (this.props.data.status === 'notWritten') {
      content = <Textarea ref="content"
        disabled={this.props.disabled || this.state.confirmation}
        onKeyDown={this.onActionsKey}
        onFocus={this.onTextareaFocus}>
      </Textarea>;
    } else {
      content = <div className="text">{this.props.data.content}</div>;
    }

    return (
      <section className={boxClasses} ref="container">
        {confirmationOverlay}
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
