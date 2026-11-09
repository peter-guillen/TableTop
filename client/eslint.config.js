import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Flat config (ESLint 9). Replaces the old .eslintrc.cjs, which ESLint 9 ignores.
export default tseslint.config(
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "18.2" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      // TypeScript checks component props; prop-types would duplicate it
      "react/prop-types": "off",
      // Apostrophes and quotes are fine in JSX text; still catch > and } typos
      "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  // Node-run config files at the package root
  {
    files: ["*.config.{js,ts}", "*.config.cjs"],
    languageOptions: { globals: globals.node },
  },
);
