/* eslint no-magic-numbers: 0 */
/* eslint max-nested-callbacks: [2, 4] */

const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

module.exports = (state, doLoginRequest, testRequest, fixtures) => {

  describe('/users', () => {

    const user = {
      username: 'usertest',
      password: 'pwd'
    };

    before(() => fixtures.database.users.insert(user.username, user.password));

    after(() => fixtures.database.users.delete());

    describe('POST /login', () => {

      it('should fail if payload is empty', () => {
        return testRequest(doLoginRequest(), HTTP_BAD_REQUEST);
      });

      it('should fail if payload is not in the good format', () => {
        return testRequest(doLoginRequest('', ''), HTTP_BAD_REQUEST);
      });

      it('should succeed if payload is correct', () => {
        return testRequest(doLoginRequest(user.username, user.password), HTTP_CREATED)
          .then(payload => {
            payload.should.have.property('token');
            payload.token.should.have.length.above(0);
          });
      });

      it('should fail if payload is incorrect', () => {
        return testRequest(doLoginRequest(user.username, 'wrongpassword'), HTTP_BAD_REQUEST)
          .then(payload => {
            payload.message.should.equal('User not found');
          });
      });
    });
  });

};
