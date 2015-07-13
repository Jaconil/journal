'use strict';

import { EventEmitter } from 'events';

class BaseStore extends EventEmitter {
  constructor() {
    super();
  }

  addChangeListener(callback) {
    this.addListener('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  emitChange() {
    this.emit('change');
  }
}

export default BaseStore;
