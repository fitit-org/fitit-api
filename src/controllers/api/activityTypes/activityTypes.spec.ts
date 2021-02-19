import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const apiURL = '127.0.0.1:3000';

describe('/api/v1/activitytypes', () => {
  describe('/ GET', () => {
    it('Should get all activity types', async () => {
      return chai
        .request(apiURL)
        .get('/api/v1/activitytypes')
        .then(async (res) => {
          chai.expect(res.body).to.deep.equal([
            {
              _id: '601bd8d722c26a2ef9298df7',
              kcalPerHour: 600,
              name: 'Kolarstwo',
            },
          ]);
          chai.expect(res).to.be.json;
          chai.expect(res).to.have.status(200);
        });
    });
  });
  describe('/:id GET', () => {
    it('Should get specified activity type', async () => {
      return chai
        .request(apiURL)
        .get('/api/v1/activitytypes/601bd8d722c26a2ef9298df7')
        .then(async (res) => {
          chai.expect(res.body).to.deep.equal({
            _id: '601bd8d722c26a2ef9298df7',
            kcalPerHour: 600,
            name: 'Kolarstwo',
          });
          chai.expect(res).to.be.json;
          chai.expect(res).to.have.status(200);
        });
    });
    it('Should return error', async () => {
      return chai
        .request(apiURL)
        .get('/api/v1/activitytypes/2137')
        .then((res) => {
          chai.expect(res.body).to.deep.equal({
            status: 404,
            message: 'Activity type with id 2137 not found',
          });
          chai.expect(res).to.be.json;
          chai.expect(res).to.have.status(404);
        });
    });
  });
});
