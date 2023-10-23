import { describe, expect, it } from '@jest/globals'
import petOperations from '../framework/services/helpers/pet.js'
import petStatuses from '../framework/consts.js'
import randomString from '../framework/fixtures/fixtures.js'
import { beforeAll } from 'jest-circus'

let id

beforeAll(() => {
  id = ''
})

describe('Операции работы с домашним питомцем', () => {
  it('Создание нового питомца', async () => {
    id = Date.now()

    const res = await petOperations.createPet(id)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('id')
    expect(res.body.id).toBe(id)

    expect(res.body).toHaveProperty('name')
    expect(res.body.name).not.toBe('')

    expect(res.body).toHaveProperty('photoUrls')
    expect(res.body.photoUrls).not.toBe('')

    expect(res.body).toHaveProperty('tags')
    expect(res.body.tags).toEqual([])

    expect(res.body).toHaveProperty('status')
    expect(res.body.status).toEqual(petStatuses.AVAILABLE)
  })
  it('Получение информации о созданном домашнем питомце', async () => {
    const res = await petOperations.getPetInfo(id)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('id')
    expect(res.body.id).toBe(id)

    expect(res.body).toHaveProperty('name')
    expect(res.body.name).not.toBe('')

    expect(res.body).toHaveProperty('photoUrls')
    expect(res.body.photoUrls).not.toBe('')

    expect(res.body).toHaveProperty('tags')
    expect(res.body.tags).toEqual([])

    expect(res.body).toHaveProperty('status')
    expect(res.body.status).toEqual(petStatuses.AVAILABLE)
  })
  it('Обновление информации о домашнем питомце', async () => {
    const newAnimalKind = randomString.animalKind()

    const res = await petOperations.updatePetInfo(id, newAnimalKind)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('id')
    expect(res.body.id).toBe(id)

    expect(res.body).toHaveProperty('name')
    expect(res.body.name).toBe(newAnimalKind)

    expect(res.body).toHaveProperty('photoUrls')
    expect(res.body.photoUrls).not.toBe('')

    expect(res.body).toHaveProperty('tags')
    expect(res.body.tags).toEqual([])

    expect(res.body).toHaveProperty('status')
    expect(res.body.status).toEqual(petStatuses.SOLD)
  })
  it('Удаление информации о питомце', async () => {
    const res = await petOperations.deletePet(id)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')

    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe(`${id}`)
  })
  it('Получение информации об удаленном домашнем питомце', async () => {
    const res = await petOperations.getPetInfo(id)

    expect(res.status).toBe(404)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(1)

    expect(res.body).toHaveProperty('type')
    expect(res.body.type).toBe('error')

    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('Pet not found')
  })
})
