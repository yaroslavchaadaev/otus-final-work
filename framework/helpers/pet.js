import supertest from 'supertest'
import config from '../config/config.js'
import randomString, { randomFile } from '../fixtures/fixtures.js'

import petStatuses from '../consts.js'

const baseURL = config.baseURL

const petOperations = {
  createPet: id => {
    const animalKind = randomString.animalKind()
    return supertest(baseURL)
      .post('/pet')
      .set('Accept', 'application/json')
      .send({
        id,
        name: animalKind,
        photoUrls: [`${randomFile.photo(animalKind)}`],
        status: petStatuses.AVAILABLE
      })
  },
  getPetInfo: petID => {
    return supertest(baseURL)
      .get(`/pet/${petID}`)
      .set('Accept', 'application/json')
  },
  updatePetInfo: (id, newAnimalKind) => {
    return supertest(baseURL)
      .put('/pet')
      .set('Accept', 'application/json')
      .send({
        id,
        name: newAnimalKind,
        photoUrls: [`${randomFile.photo(newAnimalKind)}`],
        status: petStatuses.SOLD
      })
  },
  deletePet: id => {
    return supertest(baseURL).delete(`/pet/${id}`)
  }
}

export default petOperations
