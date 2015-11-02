
import { events as appEvents } from './stores/baseStore';
import { events as userEvents } from './stores/userStore';
import { events as daysEvents } from './stores/daysStore';

export default {
  app: appEvents,
  user: userEvents,
  days: daysEvents,
  day: {
    UPDATE: 'day.update'
  }
};
