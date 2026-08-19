module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  reporters: [
    'default',
    [ 'jest-junit', { outputDirectory: './', outputName: 'jest-junit.xml' } ]
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['json-summary','lcov','text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
