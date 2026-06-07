import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
  },
});
