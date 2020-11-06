// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jestSettings.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};
