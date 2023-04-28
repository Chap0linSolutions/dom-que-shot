/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageReporters: ["text", "html"],
  passWithNoTests: true,
  moduleNameMapper:{
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
  },
};