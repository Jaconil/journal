'use strict';

import React from 'react';
import _ from 'lodash';
import scroll from 'scroll';

import Loader from '../Loader/loader.jsx';

import './daysList.less';

class DaysList extends React.Component {

  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      windowHeight: window.innerHeight
    };
  }

  handleResize() {
    this.setState({
      windowHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    var items = this.refs.list.childNodes;

    if (!items.length) {
      return;
    }

    var firstItemStyle = window.getComputedStyle(items[0]);
    var lastItemStyle = window.getComputedStyle(items[items.length - 1]);

    var firstH = _.parseInt(firstItemStyle.marginTop) + _.parseInt(firstItemStyle.height);
    var lastH = _.parseInt(lastItemStyle.height) + _.parseInt(lastItemStyle.marginBottom);
    var margin = _.parseInt(lastItemStyle.marginBottom);

    this.refs.list.style.paddingTop = this.state.windowHeight / 2 - firstH / 2 + 'px';
    this.refs.list.style.paddingBottom = this.state.windowHeight / 2 - lastH / 2 - margin + 'px';

    // Scroll
    var selectedItem = items[this.props.selected];
    var selectedItemStyle = window.getComputedStyle(selectedItem);
    var offsetDiff = selectedItem.offsetTop - items[0].offsetTop;
    var heightDiff = _.parseInt(firstItemStyle.height) / 2 - _.parseInt(selectedItemStyle.height) / 2;
    var topScroll = offsetDiff - heightDiff;

    scroll.top(this.refs.container, topScroll, { duration: 600 });
  }

  render() {
    var loader = this.props.loading ? <Loader className="dayList-loader" /> : null;
    var emptyText = this.props.emptyText && !this.props.loading && !this.props.children.length ? <div className="empty">{this.props.emptyText}</div> : null;

    return (
      <section className="daysList" ref="container">
        {loader}
        {emptyText}
        <div ref="list" key={this.props.children.length} className="animated fadeIn">
          {this.props.children}
        </div>
      </section>
    );
  }
}

DaysList.propTypes = {
  selected: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool,
  emptyText: React.PropTypes.string
};

export default DaysList;
