import { faker } from '@faker-js/faker'

const randomString = {
  username: () => {
    return faker.internet.displayName()
  },
  firstName: () => {
    return faker.person.firstName()
  },
  lastName: () => {
    return faker.person.lastName()
  },
  email: () => {
    return faker.internet.email()
  },
  password: () => {
    return faker.internet.password()
  },
  phoneNumber: () => {
    return faker.phone.number()
  }
}

export default randomString
