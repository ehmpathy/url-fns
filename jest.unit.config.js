module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/src/**/?(*.)+(spec|test).(js|ts)'],
  testEnvironment: 'node',
  setupFiles: ['core-js'], // enables .flat; https://stackoverflow.com/a/59285424/3068233
};
