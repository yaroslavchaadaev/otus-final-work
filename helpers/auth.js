import supertest from 'supertest'
import config from '../framework/config/config.js'

const baseURL = config.baseURL

const authOperations = {
  loginUser: (userName, userPassword) => {
    return supertest(baseURL)
      .get(`/user/login?username=${userName}&password=${userPassword}`)
      .set('Accept', 'application/json')
  },
  logoutUser: () => {
    return supertest(baseURL)
      .get('/user/logout')
      .set('Accept', 'application/json')
  }
}

export default authOperations
