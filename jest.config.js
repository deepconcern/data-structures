const { readdirSync } = require('fs');
const { resolve } = require('path');

const createProjectConfiguration = (projectName) => {
  return {
    displayName: projectName,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [`<rootDir>/packages/${projectName}/src/**/*.test.ts`]
  };
};

module.exports = {
  projects: readdirSync(resolve(__dirname, 'packages')).map(createProjectConfiguration),
};