import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const apiURL = '127.0.0.1:3000';

describe('/api/v1/activitylog', () => {
  describe('/ GET', () => {
    it('Should return all users activities', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .get('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.deep.equal([
                {
                  _id: '601bef6a25c8480b19dd54cd',
                  startDate: '2021-02-04T12:58:18.000Z',
                  activityType_id: {
                    _id: '601bd8d722c26a2ef9298df7',
                    kcalPerHour: 600,
                    name: 'Kolarstwo',
                  },
                },
                {
                  _id: '601bef6a25c8480b19dd99cd',
                  startDate: '2021-02-04T12:58:18.000Z',
                  endDate: '2021-02-05T12:58:18.000Z',
                  activityType_id: {
                    _id: '601bd8d722c26a2ef9298df7',
                    kcalPerHour: 600,
                    name: 'Kolarstwo',
                  },
                },
              ]);
              done();
            });
        });
    });
    it('Should return all users unfinished activities', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .get('/api/v1/activitylog?unfinished=true')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.deep.equal([
                {
                  _id: '601bef6a25c8480b19dd54cd',
                  startDate: '2021-02-04T12:58:18.000Z',
                  activityType_id: {
                    _id: '601bd8d722c26a2ef9298df7',
                    kcalPerHour: 600,
                    name: 'Kolarstwo',
                  },
                },
              ]);
              done();
            });
        });
    });
  });
  describe('/:id GET', () => {
    it('Should return single activity as pupil', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .get('/api/v1/activitylog/601bef6a25c8480b19dd54cd')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.deep.equal({
                _id: '601bef6a25c8480b19dd54cd',
                startDate: '2021-02-04T12:58:18.000Z',
                activityType_id: {
                  _id: '601bd8d722c26a2ef9298df7',
                  kcalPerHour: 600,
                  name: 'Kolarstwo',
                },
              });
              done();
            });
        });
    });
    it('Should return a single activity as teacher', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testteacher.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .get('/api/v1/activitylog/601bef6a25c8480b19dd54cd')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.deep.equal({
                _id: '601bef6a25c8480b19dd54cd',
                startDate: '2021-02-04T12:58:18.000Z',
                activityType_id: {
                  _id: '601bd8d722c26a2ef9298df7',
                  kcalPerHour: 600,
                  name: 'Kolarstwo',
                },
              });
              done();
            });
        });
    });
    it('Should return UnauthorizedToViewActivityException as pupil', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil2.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .get('/api/v1/activitylog/601bef6a25c8480b19dd54cd')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(403);
              chai.expect(res.body).to.deep.equal({
                status: 403,
                message:
                  'Unauthorized to view activity with id 601bef6a25c8480b19dd54cd',
              });
              done();
            });
        });
    });
    it('Should return UnauthorizedToViewActivityException as teacher', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testteacher2.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .get('/api/v1/activitylog/601bef6a25c8480b19dd54cd')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(403);
              chai.expect(res.body).to.deep.equal({
                status: 403,
                message:
                  'Unauthorized to view activity with id 601bef6a25c8480b19dd54cd',
              });
              done();
            });
        });
    });
    it('Should return NoSuchActivityException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testteacher2.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .get('/api/v1/activitylog/12345')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(404);
              chai.expect(res.body).to.deep.equal({
                status: 404,
                message: 'Activity with id 12345 not found',
              });
              done();
            });
        });
    });
  });
  describe('/ POST', () => {
    it('Should create a single activity with filled dates', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bd8d722c26a2ef9298df7',
              startDate: '2021-02-04T12:58:18.000+00:00',
              endDate: '2021-02-05T12:58:18.000+00:00',
            })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(201);
              chai
                .expect(res.body)
                .to.have.keys([
                  '_id',
                  'startDate',
                  'endDate',
                  'activityType_id',
                ]);
              chai
                .expect(res.body.activityType_id)
                .to.have.keys(['_id', 'kcalPerHour', 'name']);
              done();
            });
        });
    });
    it('Should create a single activity without filled dates', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bd8d722c26a2ef9298df7',
            })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(201);
              chai
                .expect(res.body)
                .to.have.keys(['_id', 'startDate', 'activityType_id']);
              chai
                .expect(res.body.activityType_id)
                .to.have.keys(['_id', 'kcalPerHour', 'name']);
              done();
            });
        });
    });
    it('Should return ActivityTypeNotFoundException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bef6a25c8480b19dd54cd',
            })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(400);
              chai.expect(res.body).to.deep.equal({
                status: 400,
                message:
                  'No activity type with id 601bef6a25c8480b19dd54cd found',
              });
              done();
            });
        });
    });
    it('Should return InvalidActivityTimesException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bd8d722c26a2ef9298df7',
              startDate: '2021-02-04T12:58:18.000+00:00',
              endDate: '2021-02-03T12:58:18.000+00:00',
            })
            .end((err, res) => {
              chai.expect(res).to.be.json;
              chai.expect(res).to.have.status(400);
              chai.expect(res.body).to.deep.equal({
                status: 400,
                message: 'Invalid activity times',
              });
              done();
            });
        });
    });
  });
  describe('/:id PATCH', () => {
    it('Should create an activity, update and return it', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bd8d722c26a2ef9298df7',
              startDate: '2021-02-03T12:58:18.000+00:00',
            })
            .end((err, res) => {
              chai
                .request(apiURL)
                .patch(`/api/v1/activitylog/${res.body._id}`)
                .set({ Authorization: `Bearer ${token}` })
                .send({
                  endDate: '2021-02-05T12:58:18.000+00:00',
                })
                .end((err, res) => {
                  chai.expect(res).to.have.status(200);
                  chai.expect(res).to.be.json;
                  chai
                    .expect(res.body)
                    .to.have.keys([
                      '_id',
                      'startDate',
                      'endDate',
                      'activityType_id',
                    ]);
                  chai
                    .expect(res.body.activityType_id)
                    .to.have.keys(['_id', 'kcalPerHour', 'name']);
                  done();
                });
            });
        });
    });
    it('Should return ActivityNotFoundException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .patch(`/api/v1/activitylog/dzikieweze`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
              endDate: '2021-02-05T12:58:18.000+00:00',
            })
            .end((err, res) => {
              chai.expect(res).to.have.status(404);
              chai.expect(res).to.be.json;
              chai.expect(res.body).to.deep.equal({
                status: 404,
                message: 'Activity with id dzikieweze not found',
              });
              done();
            });
        });
    });
    it('Should return UnauthorizedToViewActivityExcepton', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          let token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bd8d722c26a2ef9298df7',
              startDate: '2021-02-03T12:58:18.000+00:00',
            })
            .end((err, res) => {
              const activityId: string = res.body._id;
              chai
                .request(apiURL)
                .post('/auth/login')
                .send({
                  email: 'testteacher.email@example.com',
                  password: '2137',
                })
                .end((err, res) => {
                  token = res.body.token;
                  chai
                    .request(apiURL)
                    .patch(`/api/v1/activitylog/${activityId}`)
                    .set({ Authorization: `Bearer ${token}` })
                    .send({
                      endDate: '2021-02-05T12:58:18.000+00:00',
                    })
                    .end((err, res) => {
                      chai.expect(res).to.have.status(403);
                      chai.expect(res).to.be.json;
                      chai.expect(res.body).to.deep.equal({
                        status: 403,
                        message: `Unauthorized to view activity with id ${activityId}`,
                      });
                      done();
                    });
                });
            });
        });
    });
    it('Should return NoSuchActivityTypeException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bd8d722c26a2ef9298df7',
              startDate: '2021-02-03T12:58:18.000+00:00',
            })
            .end((err, res) => {
              chai
                .request(apiURL)
                .patch(`/api/v1/activitylog/${res.body._id}`)
                .set({ Authorization: `Bearer ${token}` })
                .send({
                  activityType_id: '601bd8d722c26a2e11198df7',
                })
                .end((err, res) => {
                  chai.expect(res).to.have.status(400);
                  chai.expect(res).to.be.json;
                  chai.expect(res.body).to.deep.equal({
                    status: 400,
                    message:
                      'No activity type with id 601bd8d722c26a2e11198df7 found',
                  });
                  done();
                });
            });
        });
    });
    it('Should return InvalidActivityTimesException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token;
          chai
            .request(apiURL)
            .post('/api/v1/activitylog')
            .set({ Authorization: `Bearer ${token}` })
            .send({
              activityType_id: '601bd8d722c26a2ef9298df7',
              startDate: '2021-02-03T12:58:18.000+00:00',
            })
            .end((err, res) => {
              chai
                .request(apiURL)
                .patch(`/api/v1/activitylog/${res.body._id}`)
                .set({ Authorization: `Bearer ${token}` })
                .send({
                  endDate: '2021-01-03T12:58:18.000+00:00',
                })
                .end((err, res) => {
                  chai.expect(res).to.have.status(400);
                  chai.expect(res).to.be.json;
                  chai.expect(res.body).to.deep.equal({
                    status: 400,
                    message: 'Invalid activity times',
                  });
                  done();
                });
            });
        });
    });
  });
});
