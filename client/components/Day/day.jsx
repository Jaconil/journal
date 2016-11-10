'use strict';

import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import classNames from 'classnames';

import Textarea from 'react-textarea-autosize';
import DayHeader from './dayHeader.jsx';

import { update, submit } from '../../actionCreators/day.js';

import './day.less';

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;

class Day extends React.Component {

  constructor(props) {
    super(props);
    this.onActionsClose = this.onActionsClose.bind(this);
    this.onActionsSubmit = this.onActionsSubmit.bind(this);
    this.onActionsEdit = this.onActionsEdit.bind(this);
    this.onActionsKey = this.onActionsKey.bind(this);

    this.onConfirmationBack = this.onConfirmationBack.bind(this);
    this.onConfirmationSubmit = this.onConfirmationSubmit.bind(this);
    this.onConfirmationKey = this.onConfirmationKey.bind(this);

    this.onTextareaFocus = this.onTextareaFocus.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);

    this.handleFocus = this.handleFocus.bind(this);

    this.state = {
      confirmation: false,
      editing: false,
      content: this.props.data.content
    };
  }

  componentDidMount() {
    this.handleFocus();

    // Manage cursor position to the end of the text
    if (!this.props.disabled && this.isEditable()) {
      const contentLength = this.content.value.length;

      ReactDOM.findDOMNode(this.content).setSelectionRange(contentLength, contentLength);
    }
  }

  componentDidUpdate() {
    if (this.props.canFocus) {
      this.handleFocus();
    }
  }

  onActionsClose() {
    this.container.classList.remove('focused');
    this.setState({ editing: false });
    this.props.onClose();
  }

  onActionsSubmit() {
    document.querySelector('body').addEventListener('keydown', this.onConfirmationKey);
    this.setState({ confirmation: true });
  }

  onActionsEdit() {
    this.setState({
      editing: true,
      content: this.props.data.content
    });
  }

  onActionsKey(event) {
    if (event.keyCode === KEY_ENTER && !event.shiftKey) {
      event.preventDefault();
      this.onActionsSubmit();
    }
  }

  onConfirmationBack() {
    document.querySelector('body').removeEventListener('keydown', this.onConfirmationKey);
    this.setState({ confirmation: false });
  }

  onConfirmationSubmit() {
    const content = this.content.value;

    this.onConfirmationBack();
    this.onActionsClose();

    this.props.dispatch(submit(this.props.data.date, content))
      .then(this.props.onSubmit)
      .catch(_.noop);
  }

  onConfirmationKey(event) {
    event.preventDefault();

    if (event.keyCode === KEY_ESCAPE) {
      this.onConfirmationBack();
    } else if (event.keyCode === KEY_ENTER) {
      this.onConfirmationSubmit();
    }
  }

  onTextareaFocus() {
    this.container.classList.add('focused');
    this.props.onFocus();
  }

  onTextareaChange() {
    this.setState({ content: this.content.value });

    if (!this.state.editing) {
      this.props.dispatch(update(this.props.data.date, this.content.value));
    }
  }

  handleFocus() {
    if (!this.props.disabled && this.isEditable()) {
      this.content.focus();
      this.onTextareaFocus();
    }
  }

  isEditable() {
    return this.props.data.status === 'notWritten' || this.props.data.status === 'draft' || this.state.editing;
  }

  render() {
    const boxClasses = classNames('day', {
      disabled: this.props.disabled,
      confirmation: this.state.confirmation,
      editable: this.isEditable()
    });

    let actions = [];
    let content = null;
    let confirmationOverlay = null;

    if (this.state.confirmation) {
      confirmationOverlay = (
        <div className="confirmationOverlay">
          <button onClick={this.onConfirmationBack}><i className="fa fa-close fa-2x"></i></button>
          <button onClick={this.onConfirmationSubmit}><i className="fa fa-check fa-2x"></i></button>
        </div>
      );
    }

    if (this.isEditable()) {
      if (!this.props.disabled && !this.state.confirmation) {
        actions.push({ key: 'close', callback: this.onActionsClose });
        actions.push({ key: 'submit', callback: this.onActionsSubmit });
      }

      content = (
        <Textarea
          ref={element => this.content = element}
          disabled={this.props.disabled || this.state.confirmation}
          onKeyDown={this.onActionsKey}
          onChange={this.onTextareaChange}
          onFocus={this.onTextareaFocus}
          value={this.state.content}
        />
      );
    } else {
      actions.push({ key: 'edit', callback: this.onActionsEdit });

      content = <div className="text">{this.props.data.content}</div>;
    }

    return (
      <section className={boxClasses} ref={element => this.container = element}>
        {confirmationOverlay}
        <DayHeader date={this.props.data.date} status={this.props.data.status} actions={actions} />
        {content}
      </section>
    );
  }
}

Day.propTypes = {
  canFocus: React.PropTypes.bool,
  data: React.PropTypes.shape({
    date: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    content: React.PropTypes.string
  }).isRequired,
  disabled: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onSubmit: React.PropTypes.func
};

Day.defaultProps = {
  onClose: _.noop,
  onFocus: _.noop,
  onSubmit: _.noop
};

export default connect()(Day);
