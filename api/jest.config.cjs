module.exports = {
    testEnvironment: "node",
    transform: {},  
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
  };
  