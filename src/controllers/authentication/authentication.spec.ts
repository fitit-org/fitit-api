import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
const apiURL = '127.0.0.1:3000'

describe('AUTH', () => {
  describe('/auth/register', () => {
    it('Should register a pupil and return', async () => {
      return chai
        .request(apiURL)
        .post('/auth/register')
        .send({
          name: 'NewPupilName',
          surname: 'NewPupilSurname',
          password: ">'!Xr36Q.~p!sE`j",
          classId: 'busy-shamrock-holmes',
          email: 'newpupil@example.com',
        })
        .then(async (res) => {
          chai
            .expect(res.body)
            .to.have.keys([
              'name',
              'surname',
              'email',
              'isActive',
              'isTeacher',
              'class_ids',
              'dateCreated',
              '_id',
            ])
          chai
            .expect(res.body.class_ids[0])
            .to.have.keys(['_id', 'isActive', 'name', 'humanReadable'])
          chai.expect(res).to.be.json
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.isTeacher).to.equal(false)
        })
    })
    it('Should register a teacher and return', async () => {
      return chai
        .request(apiURL)
        .post('/auth/register')
        .send({
          name: 'NewTeacherName',
          surname: 'NewTeacherSurname',
          password: ">'!Xr36Q.~p!sE`j",
          classId: 'AffGLJKqRRlggnB8skbzd',
          email: 'newteacher@example.com',
        })
        .then(async (res) => {
          chai
            .expect(res.body)
            .to.have.keys([
              'name',
              'surname',
              'email',
              'isActive',
              'isTeacher',
              'class_ids',
              'dateCreated',
              '_id',
            ])
          chai.expect(res).to.be.json
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.isTeacher).to.equal(true)
        })
    })
    it('Should return the NoClassException', async () => {
      return chai
        .request(apiURL)
        .post('/auth/register')
        .send({
          name: 'NewUserName',
          surname: 'NewUserSurname',
          password: ">'!Xr36Q.~p!sE`j",
          classId: 'non-existing-classid',
          email: 'newuser@example.com',
        })
        .then((res) => {
          chai.expect(res.body).to.deep.equal({
            status: 400,
            message: 'No class identified by non-existing-classid found.',
          })
          chai.expect(res).to.be.json
          chai.expect(res).to.have.status(400)
        })
    })
    it('Should return the UserWithThatEmailAlreadyExistsException', async () => {
      return chai
        .request(apiURL)
        .post('/auth/register')
        .send({
          name: 'NewUserName',
          surname: 'NewUserSurname',
          password: ">'!Xr36Q.~p!sE`j",
          classId: 'busy-shamrock-holmes',
          email: 'testpupil.email@example.com',
        })
        .then((res) => {
          chai.expect(res.body).to.deep.equal({
            status: 400,
            message:
              'User with email testpupil.email@example.com already exists.',
          })
          chai.expect(res).to.be.json
          chai.expect(res).to.have.status(400)
        })
    })
  })

  describe('/auth/login', () => {
    it('Should login a user and return', async () => {
      return chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137',
        })
        .then((res) => {
          chai.expect(res.body).to.have.keys(['user', 'token'])
          chai.expect(res).to.be.json
          chai.expect(res).to.have.status(200)
        })
    })
    it('Should return error on wrong email', async () => {
      return chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'wrong.email@example.com',
          password: '2137',
        })
        .then((res) => {
          chai.expect(res.body).to.deep.equal({
            status: 401,
            message: 'Wrong credentials provided',
          })
          chai.expect(res).to.be.json
          chai.expect(res).to.have.status(401)
        })
    })
    it('Should return error on wrong password', async () => {
      return chai
        .request(apiURL)
        .post('/auth/login')
        .send({
          email: 'testpupil.email@example.com',
          password: '2137gmd',
        })
        .then((res) => {
          chai.expect(res.body).to.deep.equal({
            status: 401,
            message: 'Wrong credentials provided',
          })
          chai.expect(res).to.be.json
          chai.expect(res).to.have.status(401)
        })
    })
  })
})
