'use strict';

/* eslint no-magic-numbers: 0 */
/* eslint max-nested-callbacks: [2, 4] */

const HTTP_CREATED = 201;
const HTTP_BAD_PARAMS = 400;

module.exports = (state, createUser, doLoginRequest, testRequest) => {

  describe('/users', () => {

    const user = createUser(1, 'usertest', 'pwd');

    describe('POST /login', () => {

      it('should fail if payload is empty', () => {
        return testRequest(doLoginRequest(), HTTP_BAD_PARAMS);
      });

      it('should fail if payload is not in the good format', () => {
        return testRequest(doLoginRequest('', ''), HTTP_BAD_PARAMS);
      });

      it('should succeed if payload is correct', () => {
        return testRequest(doLoginRequest(user.username, user.password), HTTP_CREATED)
          .then(payload => {
            payload.should.have.property('token');
            payload.token.should.have.length.above(0);
          });
      });

      it('should fail if payload is incorrect', () => {
        return testRequest(doLoginRequest(user.username, 'wrongpassword'), HTTP_BAD_PARAMS)
          .then(payload => {
            payload.message.should.equal('User not found');
          });
      });
    });
  });

};
