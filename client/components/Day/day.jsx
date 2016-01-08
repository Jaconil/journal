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
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onSubmitEnter = this.onSubmitEnter.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.state = { confirmation: false };
  }

  onCloseClick() {
    this.refs.container.classList.remove('focused');
  }

  onBackClick() {
    this.setState({ confirmation: false });
  }

  onSubmitClick() {
    if (this.state.confirmation) {
      this.onCloseClick();
      this.props.dispatch(update(this.props.data.date, this.refs.content.value));
      this.props.onSubmit();
    }

    this.setState({ confirmation: !this.state.confirmation });
  }

  onSubmitEnter(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      this.onSubmitClick();
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
    var boxClasses = classNames('day', {
      disabled: this.props.disabled,
      confirmation: this.state.confirmation,
      focused: !this.props.disabled && this.props.data.status === 'notWritten'
    });
    var statusClasses = classNames('status', _.kebabCase(this.props.data.status));

    var actions = null;
    var content = null;
    var confirmationOverlay = null;

    if (!this.props.disabled && !this.state.confirmation && this.props.data.status === 'notWritten') {
      actions = <div className="actions">
        <button className="close" onClick={this.onCloseClick}><i className="fa fa-close"></i></button>
        <button className="submit" onClick={this.onSubmitClick}><i className="fa fa-check"></i></button>
      </div>;
    }

    if (this.props.data.status === 'notWritten') {
      content = <Textarea ref="content" disabled={this.props.disabled || this.state.confirmation} onKeyDown={this.onSubmitEnter}></Textarea>;
    } else {
      content = <div className="text">{this.props.data.content}</div>;
    }

    if (this.state.confirmation) {
      confirmationOverlay = <div className="confirmationOverlay">
        <button onClick={this.onBackClick}><i className="fa fa-thumbs-down fa-2x"></i></button>
        <button onClick={this.onSubmitClick}><i className="fa fa-thumbs-up fa-2x"></i></button>
      </div>;
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
