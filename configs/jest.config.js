module.exports = {
  preset: 'ts-jest',
  rootDir: 'src',
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  verbose: false,
};