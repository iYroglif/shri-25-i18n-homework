import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import formatjs from "eslint-plugin-formatjs";

export default tseslint.config(globalIgnores(["dist"]), {
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs["recommended-latest"],
        reactRefresh.configs.vite,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: {
        "simple-import-sort": simpleImportSort,
        formatjs,
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "formatjs/enforce-default-message": "error",
        "formatjs/enforce-placeholders": "error",
        "formatjs/enforce-plural-rules": "error",
        "formatjs/enforce-id": "error",
        "formatjs/no-invalid-icu": "error",
        "formatjs/no-useless-message": "error",
    },
});
