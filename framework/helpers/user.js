import supertest from 'supertest'
import config from '../config/config.js'
import randomString from '../fixtures/fixtures.js'

const baseURL = config.baseURL

const userOperations = {
  createUser: (id, userName, userPassword) => {
    return supertest(baseURL)
      .post('/user/createWithArray')
      .set('Accept', 'application/json')
      .send([
        {
          id,
          username: userName,
          firstName: randomString.firstName(),
          lastName: randomString.lastName(),
          email: randomString.email(),
          password: userPassword,
          phone: randomString.phoneNumber()
        }
      ])
  },
  getUserInfo: userName => {
    return supertest(baseURL)
      .get(`/user/${userName}`)
      .set('Accept', 'application/json')
  },
  updateUserInfo: (userName, userPassword, id, firstName, lastName) => {
    return supertest(baseURL)
      .put(`/user/${userName}`)
      .set('Accept', 'application/json')
      .send({
        id,
        username: userName,
        firstName,
        lastName,
        email: randomString.email(),
        password: userPassword,
        phone: randomString.phoneNumber()
      })
  },
  deleteUser: userName => {
    return supertest(baseURL).delete(`/user/${userName}`)
  }
}

export default userOperations
