export default {
  displayName: 'create-aws-starter-kit',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    // Handle ESM imports with .js extension
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/packages/create-aws-starter-kit',
  // Exclude template files from tests - they contain unprocessed tokens
  testPathIgnorePatterns: [
    '/node_modules/',
    '/templates/',
  ],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
