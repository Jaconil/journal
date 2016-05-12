'use strict';

const initialNotWrittenDaysState = {
  list: [],
  length: 0,
  selected: 0,
  isFetching: false
};

/**
 * Updates notWrittenDays state
 *
 * @param {object} state  - NotWrittenDays state
 * @param {object} action - Action received
 * @returns {object} Updated state
 */
function notWrittenDays(state = initialNotWrittenDaysState, action) {
  let list = null;

  switch (action.type) {
    case 'DAYS_FETCH_NOTWRITTEN':
      return _.assign({}, state, { list: [], selected: 0, isFetching: true });

    case 'DAYS_FETCH_NOTWRITTEN_RESPONSE':
      return _.assign({}, state, { isFetching: false });

    case 'DAYS_FETCH_NOTWRITTEN_MERGED':
      return _.assign({}, state, { list: action.payload, length: action.payload.length });

    case 'DAYS_NEXT_NOTWRITTEN':
      list = (state.selected === state.list.length - 1) ? [] : state.list;

      return _.assign({}, state, { selected: state.selected + 1, list });

    case 'DAY_UPDATE':
      list = _.map(state.list, day => ((day.date === action.payload.date) ? action.payload : day));

      return _.assign({}, state, { list });

    case 'DAY_SUBMIT_SUCCESS':
      return _.assign({}, state, { length: state.length - 1 });

    default:
      return state;
  }
}

/**
 * Updates days state
 *
 * @param {object} state  - Days state
 * @param {object} action - Action received
 * @returns {object} Updated state
 */
export default function(state = {}, action) {
  return {
    notWrittenDays: notWrittenDays(state.notWrittenDays, action)
  };
}
