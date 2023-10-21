import { describe, expect, it } from '@jest/globals'
import userOperations from '../helpers/user.js'
import randomString from '../framework/fixtures/fixtures.js'
import authOperations from '../helpers/auth.js'
import { beforeAll } from 'jest-circus'

let id
let userName
let userPassword
let newFirstName
let newLastName

beforeAll(() => {
  id = ''
  userName = ''
  userPassword = ''
  newFirstName = ''
  newLastName = ''
})

describe('Операции работы с пользователем', () => {
  it('Создание нового пользователя', async () => {
    id = Date.now()
    userName = randomString.username()
    userPassword = randomString.password()

    const res = await userOperations.createUser(id, userName, userPassword)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')
    expect(res.body.type).toBe('unknown')

    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('ok')
  })
  it('Получение информации о созданном пользователе', async () => {
    const res = await userOperations.getUserInfo(userName)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('username')
    expect(res.body.username).toBe(userName)

    expect(res.body).toHaveProperty('password')
    expect(res.body.password).toBe(userPassword)
  })
  it('Авторизация под созданным пользователем', async () => {
    const res = await authOperations.loginUser(userName, userPassword)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')
    expect(res.body.type).toBe('unknown')

    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toMatch('logged in user session')
  })
  it('Изменение информации о пользователе', async () => {
    newFirstName = randomString.firstName()
    newLastName = randomString.lastName()
    const res = await userOperations.updateUserInfo(
      userName,
      userPassword,
      id,
      newFirstName,
      newLastName
    )

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)
  })
  it('После изменения пользователя его имя верно отображение в методе с информацией о пользователе', async () => {
    const res = await userOperations.getUserInfo(userName)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('firstName')
    expect(res.body.firstName).toBe(newFirstName)

    expect(res.body).toHaveProperty('lastName')
    expect(res.body.lastName).toBe(newLastName)
  })
  it('Удаление пользователя', async () => {
    const res = await userOperations.deleteUser(userName)

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')
    expect(res.body.type).toBe('unknown')
  })
  it('Выход пользователя из системы', async () => {
    const res = await authOperations.logoutUser()

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toBe(200)

    expect(res.body).toHaveProperty('type')

    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('ok')
  })
})
