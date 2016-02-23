'use strict';

var initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case 'NOTIFICATION_ADD':
      return [...state, action.payload];

    case 'NOTIFICATION_REMOVE':
      return state.filter(notification => notification.id !== action.payload);

    default:
      return state;
  }
}