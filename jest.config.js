module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      '**/packages/*/src/**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    verbose: false,
  };