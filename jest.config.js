const { pathsToModuleNameMapper } = require('ts-jest/utils');
const mergeOptions = require('merge-options');
const jestTSJestPreset = require('ts-jest/jest-preset');
const { compilerOptions } = require('./tsconfig');

module.exports = mergeOptions(
  {
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  jestTSJestPreset
);
