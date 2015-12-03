'use strict';

var initialState = {
  notWrittenDays: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'DAYS_FETCH_NOTWRITTEN_SUCCESS':
      return _.assign({}, state, { notWrittenDays: action.payload });
    default:
      return state;
  }
}
