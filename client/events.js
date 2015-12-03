
import { events as appEvents } from './stores/baseStore';
import { events as daysEvents } from './stores/daysStore';

export default {
  app: appEvents,
  days: daysEvents,
  day: {
    UPDATE: 'day.update'
  }
};
