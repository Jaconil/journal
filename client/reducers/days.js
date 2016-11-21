'use strict';

const initialDayListState = {
  list: [],
  isFetching: false
};

const initialNotWrittenDaysState = _.assign(
  { selected: 0 },
  initialDayListState
);

/**
 * Updates notWrittenDays state
 *
 * @param {object} state     - NotWrittenDays state
 * @param {object} action    - Action received
 * @returns {object} Updated state
 */
function notWrittenDays(state = initialNotWrittenDaysState, action) {
  let list = null;

  switch (action.type) {
    case 'DAYS_FETCH_NOTWRITTEN':
      return _.assign({}, state, { selected: 0 });

    case 'DAYS_NEXT_NOTWRITTEN':
      list = (state.selected === state.list.length - 1) ? [] : state.list;

      return _.assign({}, state, { selected: state.selected + 1, list });

    default:
      return state;
  }
}

/**
 * Updates dayList state
 *
 * @param {object} state  - DayList state
 * @param {object} action - Action received
 * @returns {object} Updated state
 */
function dayList(actionSuffix, state = initialDayListState, action) {
  let list = null;

  switch (action.type) {
    case 'DAYS_FETCH_' + actionSuffix:
      return _.assign({}, state, { list: [], isFetching: true });

    case 'DAYS_FETCH_' + actionSuffix + '_RESPONSE':
      return _.assign({}, state, { isFetching: false });

    case 'DAYS_FETCH_' + actionSuffix + '_SUCCESS':
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
    notWrittenDays: dayList('NOTWRITTEN', notWrittenDays(state.notWrittenDays, action), action),
    exploredDays: dayList('EXPLORE', state.exploredDays, action),
    searchResults: dayList('SEARCH', state.searchResults, action)
  };
}
