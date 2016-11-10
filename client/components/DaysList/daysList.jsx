'use strict';

import scroll from 'scroll';
import classNames from 'classnames';

import Loader from '../Loader/loader.jsx';

import './daysList.less';

class DaysList extends React.Component {

  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);
    this.focusCurrentDay = this.focusCurrentDay.bind(this);
    this.closeCurrentDay = this.closeCurrentDay.bind(this);

    this.state = {
      windowHeight: window.innerHeight,
      isFocused: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const items = this.list.childNodes;

    if (!items.length) {
      return;
    }

    const firstItemStyle = window.getComputedStyle(items[0]);
    const lastItemStyle = window.getComputedStyle(items[items.length - 1]);

    const firstH = _.parseInt(firstItemStyle.marginTop) + _.parseInt(firstItemStyle.height);
    const lastH = _.parseInt(lastItemStyle.height) + _.parseInt(lastItemStyle.marginBottom);
    const margin = _.parseInt(lastItemStyle.marginBottom);

    this.list.style.paddingTop = this.state.windowHeight / 2 - firstH / 2 + 'px';
    this.list.style.paddingBottom = this.state.windowHeight / 2 - lastH / 2 - margin + 'px';

    // Scroll
    const selectedItem = items[this.props.selected];
    const selectedItemStyle = window.getComputedStyle(selectedItem);
    const offsetDiff = selectedItem.offsetTop - items[0].offsetTop;
    const heightDiff = _.parseInt(firstItemStyle.height) / 2 - _.parseInt(selectedItemStyle.height) / 2;
    const topScroll = offsetDiff - heightDiff;

    scroll.top(this.container, topScroll, { duration: 600 });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      windowHeight: window.innerHeight
    });
  }

  focusCurrentDay() {
    this.setState({
      isFocused: true
    });
  }

  closeCurrentDay() {
    this.setState({
      isFocused: false
    });
  }

  render() {
    const classes = classNames(
      'daysList',
      { focused: this.state.isFocused }
    );
    const loader = this.props.loading ? <Loader className="dayList-loader" /> : null;
    let emptyText = null;

    if (this.props.emptyText && !this.props.loading && !this.props.children.length) {
      emptyText = <div className="empty animated fadeIn">{this.props.emptyText}</div>;
    }

    const days = _.map(this.props.children, day => {
      return React.cloneElement(day, {
        onFocus: this.focusCurrentDay,
        onClose: this.closeCurrentDay
      });
    });

    return (
      <section className={classes} ref={element => this.container = element}>
        {loader}
        {emptyText}
        <div ref={element => this.list = element} key={this.props.children.length} className="animated fadeIn">
          {days}
        </div>
      </section>
    );
  }
}

DaysList.propTypes = {
  selected: React.PropTypes.number.isRequired,
  emptyText: React.PropTypes.string,
  loading: React.PropTypes.bool
};

export default DaysList;
