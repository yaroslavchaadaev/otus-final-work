export default {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/specs/**/*.spec.*'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  reporters: ['default'],
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: []
}
