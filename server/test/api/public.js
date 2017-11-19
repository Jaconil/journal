'use strict';

const HTTP_OK = 200;

module.exports = state => {

  describe('/{segments*}', () => {
    describe('GET', () => {

      it('should succeed if segment is correct', () => {
        return Promise.all([
          state.server.inject({ url: '/' }),
          state.server.inject({ url: '/test' }),
          state.server.inject({ url: '/test/path' })
        ])
          .then(responses => {
            _.each(responses, response => {
              response.statusCode.should.equal(HTTP_OK);
              response.result.should.contain('<title>Journal</title>');
            });
          });
      });

    });
  });
};
