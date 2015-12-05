'use strict';

import _ from 'lodash';

var initialNotWrittenDaysState = {
  list: [],
  length: 0,
  selected: 0,
  isFetching: false
};

function notWrittenDays(state = initialNotWrittenDaysState, action) {
  switch (action.type) {
    case 'DAYS_FETCH_NOTWRITTEN':
      return _.assign({}, state, { isFetching: true });

    case 'DAYS_FETCH_NOTWRITTEN_RESPONSE':
      return _.assign({}, state, { isFetching: false });

    case 'DAYS_FETCH_NOTWRITTEN_SUCCESS':
      return _.assign({}, state, { list: action.payload, length: action.payload.length });

    case 'DAYS_NEXT_NOTWRITTEN':
      return _.assign({}, state, { selected: state.notWrittenDays.selected + 1 });

    case 'DAY_UPDATE_SUCCESS':
      let notWrittenDays = [...state.list];
      const index = _.findIndex(notWrittenDays, 'date', action.payload.date);

      if (index >= 0) {
        notWrittenDays[index] = action.payload;
      }

      return _.assign({}, state, { list: notWrittenDays, length: state.notWrittenDays.length - 1 });

    default:
      return state;
  }
}

export default function(state = {}, action) {
  return {
    notWrittenDays: notWrittenDays(state.notWrittenDays, action)
  };
}
