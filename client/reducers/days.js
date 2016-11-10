'use strict';

const initialNotWrittenDaysState = {
  list: [],
  selected: 0,
  isFetching: false,
  isFocused: false
};

const initialExploredDaysState = {
  list: [],
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
      return _.assign({}, state, { list: action.payload });

    case 'DAYS_CHANGE_FOCUS':
      return _.assign({}, state, { isFocused: action.payload.focused });

    case 'DAYS_NEXT_NOTWRITTEN':
      list = (state.selected === state.list.length - 1) ? [] : state.list;

      return _.assign({}, state, { selected: state.selected + 1, list });

    case 'DAY_UPDATE':
      list = _.map(state.list, day => ((day.date === action.payload.date) ? action.payload : day));

      return _.assign({}, state, { list });

    default:
      return state;
  }
}

/**
 * Updates exploredDays state
 *
 * @param {object} state  - ExploredDays state
 * @param {object} action - Action received
 * @returns {object} Updated state
 */
function exploredDays(state = initialExploredDaysState, action) {
  let list = null;

  switch (action.type) {
    case 'DAYS_FETCH_EXPLORE':
      return _.assign({}, state, { list: [], isFetching: true });

    case 'DAYS_FETCH_EXPLORE_RESPONSE':
      return _.assign({}, state, { isFetching: false });

    case 'DAYS_FETCH_EXPLORE_SUCCESS':
      return _.assign({}, state, { list: action.payload });

    case 'DAY_UPDATE':
      list = _.map(state.list, day => ((day.date === action.payload.date) ? action.payload : day));

      return _.assign({}, state, { list });

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
    notWrittenDays: notWrittenDays(state.notWrittenDays, action),
    exploredDays: exploredDays(state.exploredDays, action)
  };
}
