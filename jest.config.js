/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  transform: {
    "^.+.(t|j)sx?$": ["@swc/jest"],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/index.ts",
    "!src/**/I**.ts",
    "!src/**/server.ts",
    "!src/**/app.ts",
  ],
  coveragePathIgnorePatterns: [
    "module/user/dto",
    "infra/db/prisma",
    "infra/http/factories",
    "infra/http/routes",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: ["**/*.spec.ts", "**/*.test.ts", "**/*.steps.ts"],
};
