'use strict';

var initialState = [
  {
    id: '1',
    content: 'Vous êtes déconnecté',
    icon: 'sign-out',
    level: 'info'
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case 'NOTIFICATION_ADD':
      return [action.payload, ...state];

    case 'NOTIFICATION_REMOVE':
      return state.filter(notification => notification.id !== action.payload);

    default:
      return state;
  }
}
