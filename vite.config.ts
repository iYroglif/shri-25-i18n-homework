import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            {
                find: "@formatjs/icu-messageformat-parser",
                replacement: "@formatjs/icu-messageformat-parser/no-parser",
            },
        ],
    },
    plugins: [
        react({
            babel: {
                plugins: [["formatjs", { removeDefaultMessage: true }]],
            },
        }),
        svgr({
            include: "**/*.svg",
        }),
    ],
});
