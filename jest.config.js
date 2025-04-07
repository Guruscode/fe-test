module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Use jsdom for browser-like environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional setup file
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Handle module aliases if you use them
  },
};