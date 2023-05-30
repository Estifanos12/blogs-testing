import request from 'supertest'
import app from '../../src/app'

describe('Integration: POST /auth/login', () => {
  const credentials = {
    email: "john@gmail.com",
    password: "john123"
  }

  const user = {
    name: "John Doe",
    username: "john766",
    ...credentials
  }

  beforeAll(async () => {
    await request(app).post('/user').send(user)
  })

  it('return token if the credentials are correct', async () => {
    return request(app)
      .post('/auth/login')
      .send(credentials)
      .expect(200)
      .expect(/token/)
      .expect('Content-Type', /json/)
  })

  it('return unauthorized if either password or email is incorrect', async () => {
    await request(app)
      .post('/auth/login')
      .send({
        email: credentials.email,
        password: 'incorrect_pwd'
      })
      .expect(401)
      .expect(/invalid credentials/)

    await request(app)
      .post('/auth/login')
      .send({
        password: credentials.password,
        email: 'incorrect_email@gmail.com'
      })
      .expect(401)
      .expect(/invalid credentials/)
  })

  it('checks if email is present', async () => {
    return request(app)
      .post('/auth/login')
      .send({ password: credentials.password })
      .expect(400)
      .expect(/error/)
      .expect(/email/)
  })

  it('checks if email is valid', async () => {
    return request(app)
      .post('/auth/login')
      .send({
        password: credentials.password,
        email: "johngmail.com"
      })
      .expect(400)
      .expect(/error/)
      .expect(/email/)
  })

  it('checks if password is present', async () => {
    return request(app)
      .post('/auth/login')
      .send({
        email: credentials.email
      })
      .expect(400)
      .expect(/error/)
      .expect(/password/)
  })
})