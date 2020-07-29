module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: process.cwd(),
  moduleFileExtensions: ['js', 'ts'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/unit/**/*.spec.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tests/tsconfig.json',
    },
  },
};
