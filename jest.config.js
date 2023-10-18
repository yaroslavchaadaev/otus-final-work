export default {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/specs/**/*.spec.*'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './html-report',
        filename: 'report.html',
        openReport: true
      }
    ]
  ],
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: []
}
