import eslintPluginAstro from "eslint-plugin-astro";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "no-console": "error",
      "no-unused-vars": "error",
    },
    plugins: {
      "unused-imports": unusedImports,
    },
  },
];
