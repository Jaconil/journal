'use strict';

module.exports = (state) => {

  describe('GET /{segments*}', () => {

    it('should succeed if segment is correct', () => {
      return Promise.all([
        state.server.inject({ url: '/' }),
        state.server.inject({ url: '/test' }),
        state.server.inject({ url: '/test/path' })
      ])
      .then(responses => {
        _.each(responses, response => {
          response.statusCode.should.equal(200);
          response.result.should.contain('<title>Journal</title>');
        })
      });
    });

  });
};
