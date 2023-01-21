module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
