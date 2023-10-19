import { describe, expect, it } from '@jest/globals'
import userOperations from '../helpers/user.js'
import randomString from '../framework/fixtures/fixtures.js'
import { beforeAll } from 'jest-circus'

let userName
let userPassword

beforeAll(() => {
  userName = ''
  userPassword = ''
})

describe('Операции работы с пользователем', () => {
  it('Создание нового пользователя', async () => {
    userName = randomString.username()
    userPassword = randomString.password()

    const res = await userOperations.createUser(userName, userPassword)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')
    expect(res.body.type).toBe('unknown')

    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('ok')
  })
  it('Авторизация под созданным пользователем', async () => {
    const res = await userOperations.loginUser(userName, userPassword)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')
    expect(res.body.type).toBe('unknown')

    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toMatch('logged in user session')
  })
  it('Удаление пользователя', async () => {
    const res = await userOperations.deleteUser(userName)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')
    expect(res.body.type).toBe('unknown')
  })
})
