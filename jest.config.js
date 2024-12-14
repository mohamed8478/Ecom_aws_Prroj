module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testMatch: ["<rootDir>/src/App.test.js"], // Run only App.test.js
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "test-results",
      outputName: "junit.xml"
    }]
  ],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"]
};



