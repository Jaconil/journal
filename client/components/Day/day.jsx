import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';

import TextareaAutosize from 'react-textarea-autosize';
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
    this.onActionsExplore = this.onActionsExplore.bind(this);
    this.onActionsKey = this.onActionsKey.bind(this);

    this.onConfirmationBack = this.onConfirmationBack.bind(this);
    this.onConfirmationSubmit = this.onConfirmationSubmit.bind(this);
    this.onConfirmationKey = this.onConfirmationKey.bind(this);

    this.onTextareaFocus = this.onTextareaFocus.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);

    this.state = {
      confirmation: false,
      editing: false,
      content: this.props.data.content,
      isFocused: this.props.isFocused
    };
  }

  componentDidMount() {
    // Manage cursor position to the end of the text
    if (!this.props.disabled && this.isEditable()) {
      const contentLength = _.get(this.content, 'value.length', 0);

      ReactDOM.findDOMNode(this.content).setSelectionRange(contentLength, contentLength);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocused !== this.state.isFocused) {
      this.setState({ isFocused: nextProps.isFocused });
    }
  }

  componentDidUpdate() {
    if (this.state.isFocused && this.content) {
      this.content.focus();
      this.props.onFocus();
    }
  }

  onActionsClose() {
    this.setState({ editing: false, isFocused: false });
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

  onActionsExplore() {
    this.props.history.push(`/explore/${this.props.data.date}`);
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
    this.setState({ isFocused: true });
  }

  onTextareaChange() {
    this.setState({ content: this.content.value });

    if (!this.state.editing) {
      this.props.dispatch(update(this.props.data.date, this.content.value));
    }
  }

  isEditable() {
    return this.props.data.status === 'notWritten' || this.props.data.status === 'draft' || this.state.editing;
  }

  render() {
    const boxClasses = classNames('day', {
      disabled: this.props.disabled,
      confirmation: this.state.confirmation,
      editable: this.isEditable(),
      focused: this.state.isFocused
    });

    let actions = [];
    let content = null;
    let confirmationOverlay = null;

    if (this.state.confirmation) {
      confirmationOverlay = (
        <div className="confirmationOverlay">
          <button onClick={this.onConfirmationBack} type="button"><i className="fa fa-close fa-2x" /></button>
          <button onClick={this.onConfirmationSubmit} type="button"><i className="fa fa-check fa-2x" /></button>
        </div>
      );
    }

    if (this.isEditable()) {
      actions.push({ key: 'close', callback: this.onActionsClose });
      actions.push({ key: 'submit', callback: this.onActionsSubmit });

      content = (
        <TextareaAutosize
          inputRef={element => this.content = element}
          disabled={this.props.disabled || this.state.confirmation}
          onKeyDown={this.onActionsKey}
          onChange={this.onTextareaChange}
          onFocus={this.onTextareaFocus}
          value={this.state.content}
        />
      );
    } else {
      actions.push({ key: 'edit', callback: this.onActionsEdit });

      if (this.props.isExplorable) {
        actions.push({ key: 'explore', callback: this.onActionsExplore });
      }

      content = <div className="text">{this.props.data.content}</div>;
    }

    // We disable actions if day is disabled or in confirmation
    if (this.props.disabled || this.state.confirmation) {
      actions = [];
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
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    content: PropTypes.string
  }).isRequired,
  disabled: PropTypes.bool,
  isExplorable: PropTypes.bool,
  isFocused: PropTypes.bool,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmit: PropTypes.func
};

Day.defaultProps = {
  disabled: false,
  isExplorable: false,
  isFocused: false,
  onClose: _.noop,
  onFocus: _.noop,
  onSubmit: _.noop
};

export default withRouter(connect()(Day));
