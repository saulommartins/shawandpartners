module.exports = {
  // Other Jest configurations for your Node.js project...
  setupFilesAfterEnv: ['./jest.setup.ts'], // If you have a setup file, adjust the path
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
};
