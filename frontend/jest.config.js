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
  ]
};
