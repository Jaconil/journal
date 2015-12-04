'use strict';

function update(date, content) {
  return {
    type: 'DAY_UPDATE',
    api: {
      method: 'PUT',
      endpoint: '/days/' + date,
      body: {
        date: date,
        content: content,
        status: 'written'
      }
    }
  };
}

export { update };
