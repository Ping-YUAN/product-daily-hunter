import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  moduleNameMapper: {
    'chart.js/auto$': '<rootDir>/chart-stub.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/apps/hunter-server-e2e/*',
  ],
};
