module.exports = {
    preset: 'ts-jest',
    projects: ["<rootDir>/packages/*"],
    testEnvironment: 'node',
    testMatch: [
      '**/src/**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    verbose: false,
  };