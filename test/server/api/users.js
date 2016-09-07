'use strict';

module.exports = (state, createUser, doLoginRequest, testRequest) => {

  describe('/users', () => {

    const user = createUser(1, 'usertest', 'pwd');

    describe('POST /login', () => {

      it('should fail if payload is empty', () => {
        return testRequest(doLoginRequest(), 400);
      });

      it('should fail if payload is not in the good format', () => {
        return testRequest(doLoginRequest('', ''), 400);
      });

      it('should succeed if payload is correct', () => {
        return testRequest(doLoginRequest(user.username, user.password), 201)
          .then(payload => {
            payload.should.have.property('token');
            payload.token.should.have.length.above(0);
          });
      });

      it('should fail if payload is incorrect', () => {
        return testRequest(doLoginRequest(user.username, 'wrongpassword'), 400)
          .then(payload => {
            payload.message.should.equal('User not found');
          });
      });
    });
  });

};
