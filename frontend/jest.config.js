module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Add this mapping to treat .css imports as a mock.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy',
  },

  setupFilesAfterEnv: ['./src/setupTests.ts'], // adjust the path as needed

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },

  // Add this line to ignore node_modules during transformations
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true, // This enables ES modules
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
