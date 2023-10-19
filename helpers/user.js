import supertest from 'supertest'
import config from '../framework/config/config.js'
import randomString from "../framework/fixtures/fixtures.js";

const baseURL = config.baseURL

const userOperations = {
  createUser: (userName, userPassword) => {
    return supertest(baseURL)
      .post('/user/createWithArray')
      .set('Accept', 'application/json')
      .send([{
        id: Date.now(),
        username: userName,
        firstName: randomString.firstName(),
        lastName: randomString.lastName(),
        email: randomString.email(),
        password: userPassword,
        phone: randomString.phoneNumber()
      }])
  },
  getUserInfo: userName => {
    return supertest(baseURL)
      .get(`/user/${userName}`)
      .set('Accept', 'application/json')
  },
  deleteUser: userName => {
    return supertest(baseURL)
      .delete(`/user/${userName}`)
      .set('Accept', 'application/json')
  },
  loginUser: (userName, userPassword) => {
    return supertest(baseURL)
      .get(`/user/login?username=${userName}&password=${userPassword}`)
  }
}

export default userOperations
