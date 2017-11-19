/* eslint no-magic-numbers: 0 */
/* eslint max-nested-callbacks: [2, 4] */
/* eslint max-len: [2, {code: 150}] */

const HTTP_SUCCESS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

module.exports = (state, doLoginRequest, testRequest, fixtures) => {

  describe('/days', () => {

    const user = {
      username: 'usertest',
      password: 'pwd'
    };

    let token = null;

    before(() => fixtures.database.users.insert('usertest', 'pwd'));

    before(() => {
      return testRequest(doLoginRequest(user.username, user.password), HTTP_CREATED)
        .then(payload => {
          token = payload.token;
        });
    });

    afterEach(() => fixtures.database.days.delete());

    after(() => fixtures.database.users.delete());

    describe('GET', () => {

      /**
       * Requests /api/days with query parameters
       *
       * @param {object} query - Query parameters
       * @returns {Promise} Resolves if successful
       */
      function doDaysListRequest(query = {}) {
        const queryString = _.map(query, (value, key) => key + '=' + value).join('&');

        return state.server.inject({
          method: 'GET',
          url: '/api/days?' + queryString,
          headers: {
            Authorization: token
          }
        });
      }

      it('should fail if no dates are given', () => {
        return testRequest(doDaysListRequest(), HTTP_BAD_REQUEST);
      });

      it('should fail if only a start date is given', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01' }), HTTP_BAD_REQUEST);
      });

      it('should fail if only an ending date is given', () => {
        return testRequest(doDaysListRequest({ to: '2016-01-01' }), HTTP_BAD_REQUEST);
      });

      it('should fail if start, ending and count parameters are given', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01', to: '2016-02-01', count: 10 }), HTTP_BAD_REQUEST);
      });

      it('should fail if the ending date is before the start date', () => {
        return testRequest(doDaysListRequest({ from: '2016-02-01', to: '2016-01-01' }), HTTP_BAD_REQUEST);
      });

      it('should list all days from start date to ending date', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01', to: '2016-01-10' }), HTTP_SUCCESS)
          .then(payload => {
            payload.should.have.lengthOf(10);
            _.first(payload).should.be.deep.equal({ date: '2016-01-01', status: 'notWritten' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-10', status: 'notWritten' });
          });
      });

      it('should list days from start date with count parameter', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01', count: 5 }), HTTP_SUCCESS)
          .then(payload => {
            payload.should.have.lengthOf(5);
            _.first(payload).should.be.deep.equal({ date: '2016-01-01', status: 'notWritten' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-05', status: 'notWritten' });
          });
      });

      it('should list days to ending date with count parameter', () => {
        return testRequest(doDaysListRequest({ to: '2016-01-10', count: 5 }), HTTP_SUCCESS)
          .then(payload => {
            payload.should.have.lengthOf(5);
            _.first(payload).should.be.deep.equal({ date: '2016-01-06', status: 'notWritten' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-10', status: 'notWritten' });
          });
      });

      it('should list days filtered by a status', () => {
        const days = [{ date: '2016-01-03', status: 'draft', content: '' }, { date: '2016-01-04', status: 'draft', content: '' }];

        return fixtures.database.days.insert(days)
          .then(() => testRequest(doDaysListRequest({ from: '2016-01-01', to: '2016-01-10', status: 'draft' }), HTTP_SUCCESS))
          .then(payload => {
            payload.should.be.deep.equal(days);
          });
      });

      it('should list days filtered by multiple statuses', () => {
        const days = [{ date: '2016-01-03', status: 'written', content: '' }, { date: '2016-01-04', status: 'draft', content: '' }];

        return fixtures.database.days.insert(days)
          .then(() => testRequest(doDaysListRequest({ from: '2016-01-03', to: '2016-01-05', status: 'draft,notWritten' }), HTTP_SUCCESS))
          .then(payload => {
            payload.should.have.lengthOf(2);
            _.first(payload).should.be.deep.equal({ date: '2016-01-04', status: 'draft', content: '' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-05', status: 'notWritten' });
          });
      });
    });

    describe('PUT', () => {

      /**
       * Requests /api/days/{date} with payload
       *
       * @param {object} payload - Request payload
       * @returns {Promise} Resolves if successful
       */
      function doDayUpdateRequest(payload) {
        return state.server.inject({
          method: 'PUT',
          url: '/api/days/2016-01-01',
          payload,
          headers: {
            Authorization: token
          }
        });
      }

      /**
       * Checks if the given day is correctly inserted in databse
       *
       * @param {object} day - Day to check { date, content, status }
       * @returns {Promise} Resolves if successful
       */
      function checkDatabase(day) {
        return state.db.query('SELECT * FROM "Day" JOIN "DayStatus" ON "DayStatus"."id"="Day"."statusId"')
          .then(([response]) => {
            response.should.have.length(1);
            response[0].date.should.be.equal(day.date);
            response[0].content.should.be.equal(day.content);
            response[0].status.should.be.equal(day.status);
          });
      }

      it('should fail if status is invalid', () => {
        return testRequest(doDayUpdateRequest({ status: 'invalid', content: 'valid' }), HTTP_BAD_REQUEST);
      });

      it('should save day if status is valid', () => {
        const day = { date: '2016-01-01', status: 'written', content: 'any content' };

        return testRequest(doDayUpdateRequest(_.omit(day, 'date')), HTTP_SUCCESS)
          .then(payload => payload.should.be.deep.equal(day))
          .then(() => checkDatabase(day));
      });

      it('should fail if content is empty and status is written', () => {
        return testRequest(doDayUpdateRequest({ status: 'written', content: '' }), HTTP_BAD_REQUEST);
      });

      it('should save day if content is empty and status if draft', () => {
        const day = { date: '2016-01-01', status: 'draft', content: '' };

        return testRequest(doDayUpdateRequest(_.omit(day, 'date')), HTTP_SUCCESS)
          .then(payload => payload.should.be.deep.equal(day))
          .then(() => checkDatabase(day));
      });

    });
  });

};
