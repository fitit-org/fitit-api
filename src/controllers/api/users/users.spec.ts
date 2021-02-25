import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const apiURL = '127.0.0.1:3000'

describe('/api/v1/users', () => {
  describe('/ GET', () => {
    it('Should return current user', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          chai
            .request(apiURL)
            .get('/api/v1/users')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai
                .expect(res.body)
                .to.have.keys([
                  '_id',
                  'isActive',
                  'isTeacher',
                  'email',
                  'birthDate',
                  'class_ids',
                  'dateCreated',
                  'activityLog_ids',
                  'height',
                  'weight',
                  'name',
                  'surname',
                ])
              chai.expect(res).to.be.json
              chai.expect(res).to.have.status(200)
              done()
            })
        })
    })
  })
  describe('/:id GET', () => {
    it('Should return current user as pupil', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          const userId: string = res.body.user._id
          chai
            .request(apiURL)
            .get(`/api/v1/users/${userId}`)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai
                .expect(res.body)
                .to.have.keys([
                  '_id',
                  'isActive',
                  'isTeacher',
                  'email',
                  'birthDate',
                  'class_ids',
                  'dateCreated',
                  'activityLog_ids',
                  'height',
                  'weight',
                  'name',
                  'surname',
                ])
              chai.expect(res).to.be.json
              chai.expect(res).to.have.status(200)
              done()
            })
        })
    })
    it('Should return a pupil as their teacher', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testteacher.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          chai
            .request(apiURL)
            .get(`/api/v1/users/601be28e50364b654dec42cf`)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai
                .expect(res.body)
                .to.have.keys([
                  '_id',
                  'isActive',
                  'isTeacher',
                  'class_ids',
                  'activityLog_ids',
                  'name',
                  'surname',
                ])
              chai.expect(res).to.be.json
              chai.expect(res).to.have.status(200)
              done()
            })
        })
    })
    it('Should return a pupil as their class member', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil3.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          chai
            .request(apiURL)
            .get(`/api/v1/users/601be28e50364b654dec42cf`)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai
                .expect(res.body)
                .to.have.keys([
                  '_id',
                  'isActive',
                  'isTeacher',
                  'class_ids',
                  'name',
                  'surname',
                ])
              chai.expect(res).to.be.json
              chai.expect(res).to.have.status(200)
              done()
            })
        })
    })
    it('Should return UserNotFoundException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil3.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          chai
            .request(apiURL)
            .get(`/api/v1/users/601be28e50364b654dec1111`)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json
              chai.expect(res).to.have.status(404)
              chai.expect(res.body).to.deep.equal({
                status: 404,
                message: 'User with id 601be28e50364b654dec1111 not found',
              })
              done()
            })
        })
    })
    it('Should return UnauthorizedToViewUserException', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil2.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          chai
            .request(apiURL)
            .get(`/api/v1/users/601be28e50364b654dec42cf`)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.be.json
              chai.expect(res).to.have.status(403)
              chai.expect(res.body).to.deep.equal({
                status: 403,
                message:
                  'Unauthorized to view user with id 601be28e50364b654dec42cf',
              })
              done()
            })
        })
    })
  })
  describe('/ PATCH', () => {
    it('Should modify user data', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          chai
            .request(apiURL)
            .patch(`/api/v1/users`)
            .send({ surname: 'ModifiedPupil' })
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai
                .expect(res.body)
                .to.have.keys([
                  '_id',
                  'isActive',
                  'isTeacher',
                  'email',
                  'birthDate',
                  'class_ids',
                  'dateCreated',
                  'activityLog_ids',
                  'height',
                  'weight',
                  'name',
                  'surname',
                ])
              chai.expect(res.body.surname).to.equal('ModifiedPupil')
              chai.expect(res).to.be.json
              chai.expect(res).to.have.status(200)
              done()
            })
        })
    })
  })
  describe('/ DELETE', () => {
    it('Should remove user', (done) => {
      chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .end((err, res) => {
          const token: string = res.body.token
          chai
            .request(apiURL)
            .delete(`/api/v1/users`)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
              chai.expect(res).to.have.status(204)
              done()
            })
        })
    })
  })
})
