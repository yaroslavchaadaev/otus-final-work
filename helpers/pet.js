import supertest from 'supertest'
import config from '../framework/config/config.js'
import randomString from '../framework/fixtures/fixtures.js'
import { randomFile } from '../framework/fixtures/fixtures.js'

const baseURL = config.baseURL

const petOperations = {
  createPet: id => {
    const animalKind = randomString.animalKind()
    return supertest(baseURL)
      .post('/pet')
      .set('Accept', 'application/json')
      .send({
        id: id,
        name: animalKind,
        photoUrls: [`${randomFile.photo(animalKind)}`]
      })
  },
  getPetInfo: (petID) => {
    return supertest(baseURL)
      .get(`/pet/${petID}`)
      .set('Accept', 'application/json')
  },
  updatePetInfo: () => {
    // ---
  },
  deletePet: (id) => {
    return supertest(baseURL)
      .delete(`/pet/${id}`)
  }
}

export default petOperations
