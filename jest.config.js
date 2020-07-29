module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/src/**/*.spec.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
};
