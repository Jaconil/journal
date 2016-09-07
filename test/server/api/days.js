'use strict';

module.exports = (state, createUser, doLoginRequest, testRequest) => {

  describe('/days', () => {

    const user = createUser(1, 'usertest', 'pwd');
    let token = null;

    before(() => {
      return testRequest(doLoginRequest(user.username, user.password), 201)
        .then(payload => {
          token = payload.token
        });
    });

    describe('GET', () => {

      /**
       * Requests /api/days with query parameters
       *
       * @param {object} query - Query parameters
       * @returns {Promise} Resolves if successful
       */
      function doDaysListRequest(query) {
        query = _.map(query, (value, key) => key + '=' + value).join('&');

        return state.server.inject({
          method: 'GET',
          url: '/api/days?' + query,
          headers: {
            Authorization: token
          }
        });
      }

      it('should fail if no dates are given', () => {
        return testRequest(doDaysListRequest(), 400);
      });

      it('should fail if only a start date is given', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01' }), 400);
      });

      it('should fail if only an ending date is given', () => {
        return testRequest(doDaysListRequest({ to: '2016-01-01' }), 400);
      });

      it('should fail if start, ending and count parameters are given', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01', to: '2016-02-01', count: 10 }), 400);
      });

      it('should fail if the ending date is before the start date', () => {
        return testRequest(doDaysListRequest({ from: '2016-02-01', to: '2016-01-01' }), 400);
      });

      it('should list all days from start date to ending date', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01', to: '2016-01-10' }), 200)
          .then(payload => {
            payload.should.have.lengthOf(10);
            _.first(payload).should.be.deep.equal({ date: '2016-01-01', status: 'notWritten' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-10', status: 'notWritten' });
          });
      });

      it('should list days from start date with count parameter', () => {
        return testRequest(doDaysListRequest({ from: '2016-01-01', count: 5 }), 200)
          .then(payload => {
            payload.should.have.lengthOf(5);
            _.first(payload).should.be.deep.equal({ date: '2016-01-01', status: 'notWritten' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-05', status: 'notWritten' });
          });
      });

      it('should list days to ending date with count parameter', () => {
        return testRequest(doDaysListRequest({ to: '2016-01-10', count: 5 }), 200)
          .then(payload => {
            payload.should.have.lengthOf(5);
            _.first(payload).should.be.deep.equal({ date: '2016-01-06', status: 'notWritten' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-10', status: 'notWritten' });
          });
      });

      it('should list days filtered by a status', () => {
        const drafts = [{ date: '2016-01-03', status: 'draft' }, { date: '2016-01-04', status: 'draft' }];
        const filter = { date: { $gte: '2016-01-01', $lte: '2016-01-10' }, status: { $in: ['draft'] } };

        state.db.collection('day').find.withArgs(filter).returns({ toArray: (cb) => cb(null, drafts) });

        return testRequest(doDaysListRequest({ from: '2016-01-01', to: '2016-01-10', status: 'draft' }), 200)
          .then(payload => {
            payload.should.be.deep.equal(drafts);
          });
      });

      it('should list days filtered by multiple statuses', () => {
        const writtenDays = [{ date: '2016-01-03', status: 'written' }, { date: '2016-01-04', status: 'draft' }];
        const filter = { date: { $gte: '2016-01-03', $lte: '2016-01-05' } };

        state.db.collection('day').find.withArgs(filter).returns({ toArray: (cb) => cb(null, writtenDays) });

        return testRequest(doDaysListRequest({ from: '2016-01-03', to: '2016-01-05', status: 'draft,notWritten' }), 200)
          .then(payload => {
            payload.should.have.lengthOf(2);
            _.first(payload).should.be.deep.equal({ date: '2016-01-04', status: 'draft' });
            _.last(payload).should.be.deep.equal({ date: '2016-01-05', status: 'notWritten' });
          });
      });
    });
  });

};
