'use strict';

import React from 'react';
import _ from 'lodash';
import scroll from 'scroll';

var DaysList = React.createClass({

  propTypes: {
    selected: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      windowHeight: window.innerHeight
    };
  },

  handleResize: function() {
    this.setState({
      windowHeight: window.innerHeight
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  componentDidUpdate: function() {
    var items = this.refs.list.childNodes;
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

    scroll.top(this.refs.list, topScroll, { duration: 600 });
  },

  render: function() {
    return (
      <section className="daysList" ref="list">
        {this.props.children}
      </section>
    );
  }
});

export default DaysList;
