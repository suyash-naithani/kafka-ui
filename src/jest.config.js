const merge = require('lodash.merge');
const { jestModuleMapper } = require('../utils/tooling/aliasHelper');
const { compilerOptions } = require('../tsconfig.json');
const commonConfig = require('../test_common/jest.common.config');

const config = {
  setupFilesAfterEnv: ['<rootDir>/../test_common/jest_rtl_setup.ts'],
  testMatch: ['**/*.(spec|steps).[jt]s?(x)'],
  coverageDirectory: '<rootDir>/../coverage',
  moduleNameMapper: {
    ...compilerOptions.paths,
    ...jestModuleMapper,
    '\\.(css|less)$':
      '<rootDir>/../node_modules/@patternfly/react-styles/__mocks__/styleMock.js',
    'react-i18next': '<rootDir>/../__mocks__/react-i18next.tsx',
  },
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{js,ts,jsx,tsx}',
    '!**/index.{js,ts,jsx,tsx}',
    '!**/*.steps.*',
    '!**/*.d.ts',
    '!**/*types.ts',
    '!**/*.assets.{ts,tsx}',
    '!jest.config.js',
    '!**/mock/**/*',
  ],
};

module.exports = merge({}, commonConfig, config);