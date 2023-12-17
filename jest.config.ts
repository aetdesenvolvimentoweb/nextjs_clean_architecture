import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

export const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/__tests__/**/*.{ts,tsx}"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/app/layout.tsx",
    "!<rootDir>/src/modules/backend/domain/entities/*.ts",
    "!<rootDir>/src/modules/backend/domain/usecases/**/*.ts",
    "!<rootDir>/src/modules/backend/domain/validations/*.ts",
    "!<rootDir>/src/modules/backend/data/repositories/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
};

export default createJestConfig(customJestConfig);
