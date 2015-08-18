'use strict';

import React from 'react';

import { events as dayEvents } from '../../stores/dayStore';
import dispatcher from '../../dispatcher';

var WritePage = React.createClass({

  componentDidMount: function() {
    dispatcher.emit(dayEvents.INIT);
  },

  render: function() {
    return (
      <div>
        write page
      </div>
    );
  }
});

export default WritePage;
