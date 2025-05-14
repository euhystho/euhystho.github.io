import js from "@eslint/js";
import globals from "globals";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import astroParser from "astro-eslint-parser";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Astro recommended rules
  ...eslintPluginAstro.configs["flat/recommended"],

  // JSX accessibility rules
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],

  // Global settings
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Astro-specific configuration
  {
    files: ["*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    rules: {
      // Example: Enforce specific Astro rules
      "astro/no-set-html-directive": "error",
      // Add or override rules as needed
    },
  },

  // TypeScript-specific configuration
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Example: Enforce TypeScript rules
      "@typescript-eslint/no-unused-vars": "error",
    },
  },

  // JSX accessibility plugin configuration
  {
    files: ["**/*.{astro,ts,tsx,js,jsx}"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // Example: Enforce accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },
];
