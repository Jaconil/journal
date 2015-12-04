'use strict';

import _ from 'lodash';

var initialState = {
  notWrittenDays: [],
  notWrittenSelectedDay: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'DAYS_FETCH_NOTWRITTEN_SUCCESS':
      return _.assign({}, state, { notWrittenDays: action.payload });

    case 'DAYS_NEXT_NOTWRITTEN':
      return _.assign({}, state, { notWrittenSelectedDay: state.notWrittenSelectedDay + 1 });

    case 'DAY_UPDATE':
      const index = _.findIndex(state.notWrittenDays, 'date', action.payload.date);

      if (index >= 0) {
        state.notWrittenDays[index] = action.payload;
      }

      return _.assign({}, state);

    default:
      return state;
  }
}
