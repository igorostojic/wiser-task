import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/tests",
  fullyParallel: true,
  workers: 3,
  reporter: "html",
  expect: { timeout: 10000 },
  use: {
    baseURL: "https://automationexercise.com/",
    testIdAttribute: "data-qa",
    trace: "on",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
