const fs = require('fs');
const path = require('path');

module.exports = config => {
  const defaultView = _.template(fs.readFileSync('public/index.html', 'utf8'))({ // eslint-disable-line no-sync
    baseUrl: config.baseUrl,
    firstDay: config.firstDay
  });

  return [
    {
      path: '/{segments*}',
      method: 'GET',
      options: {
        auth: false
      },
      handler: (request, reply) => {
        const staticPath = request.params.segments || '';
        const staticFile = path.resolve('public', staticPath);

        try {
          fs.accessSync(staticFile); // eslint-disable-line no-sync
          return staticPath ? reply.file(staticFile) : defaultView;
        } catch (error) {
          return defaultView;
        }
      }
    }
  ];
};
