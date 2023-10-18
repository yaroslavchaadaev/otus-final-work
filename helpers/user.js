import supertest from 'supertest'
import config from '../framework/config/config.js'
import randomString from "../framework/fixtures/fixtures.js";

const { baseURL } = config.baseURL

const userOperations = {
  async createUser() {
    return await supertest(baseURL)
      .post('/user/createWithArray')
      .set('Accept', 'application/json')
      .send({
        id: Date.now(),
        username: randomString.username(),
        firstName: randomString.firstName(),
        lastName: randomString.lastName(),
        email: randomString.email(),
        password: randomString.password(),
        phone: randomString.phoneNumber()
      })
  },
  async getUserInfo (userName) {
    return supertest(baseURL)
      .get(`/user/${userName}`)
      .set('Accept', 'application/json')
  },
  async deleteUser (userName) {
    return supertest(baseURL)
      .delete(`/user/${userName}`)
      .set('Accept', 'application/json')
  }
}

export default userOperations
