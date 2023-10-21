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
  },
  animalKind: () => {
    return faker.animal.type()
  }
}

export const randomFile = {
  photo: (category) => {
    return faker.image.urlLoremFlickr({
      category: category
    })
  }
}

export default randomString
