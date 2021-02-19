import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const apiURL = '127.0.0.1:3000';

describe('Auth middleware tests', () => {
  it('Should login and accept token as a query param, an auth header and a cookie', (done) => {
    chai
      .request(apiURL)
      .post('/auth/login')
      .send({
        email: 'testpupil.email@example.com',
        password: '2137',
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        const token: string = res.body.token;
        chai
          .request(apiURL)
          .get(`/api/v1/activitylog?token=${token}`)
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai
              .request(apiURL)
              .get(`/api/v1/activitylog`)
              .set({ Authorization: `Bearer ${token}` })
              .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai
                  .request(apiURL)
                  .get(`/api/v1/activitylog`)
                  .set('Cookie', `token=${token}`)
                  .end((err, res) => {
                    chai.expect(res).to.have.status(200);
                    done();
                  });
              });
          });
      });
  });
  it('Should return AuthenticationTokenMissingException', async () => {
    return chai
      .request(apiURL)
      .get(`/api/v1/activitylog`)
      .then((res) => {
        chai.expect(res).to.be.json;
        chai.expect(res).to.have.status(401);
        chai.expect(res.body).to.deep.equal({
          status: 401,
          message: 'Authentication token missing',
        });
      });
  });
  it('Should return WrongAuthenticationTokenException', async () => {
    return chai
      .request(apiURL)
      .get(`/api/v1/activitylog?token=dzikieweze`)
      .then((res) => {
        chai.expect(res).to.be.json;
        chai.expect(res).to.have.status(401);
        chai.expect(res.body).to.deep.equal({
          status: 401,
          message: 'Wrong authentication token',
        });
      });
  });
});
