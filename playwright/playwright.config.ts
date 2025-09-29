import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./tests",
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    retries: 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [["json", { outputFile: "test-results.json" }]],
    maxFailures: 0,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: "http://127.0.0.1:3000",
        trace: "off",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1920, height: 1080 },
            },
        },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
