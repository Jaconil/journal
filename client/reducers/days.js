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
      return _.assign({}, state, { list: [], selected: 0, isFetching: true });

    case 'DAYS_FETCH_NOTWRITTEN_RESPONSE':
      return _.assign({}, state, { isFetching: false });

    case 'DAYS_FETCH_NOTWRITTEN_SUCCESS':
      return _.assign({}, state, { list: action.payload, length: action.payload.length });

    case 'DAYS_NEXT_NOTWRITTEN':
      const list = (state.selected === state.list.length - 1) ? [] : state.list;

      return _.assign({}, state, { selected: state.selected + 1, list: list });

    case 'DAY_UPDATE_SUCCESS':
      let notWrittenDays = [...state.list];
      const index = _.findIndex(notWrittenDays, 'date', action.payload.date);

      if (index >= 0) {
        notWrittenDays[index] = action.payload;
      }

      return _.assign({}, state, { list: notWrittenDays, length: state.length - 1 });

    default:
      return state;
  }
}

export default function(state = {}, action) {
  return {
    notWrittenDays: notWrittenDays(state.notWrittenDays, action)
  };
}
