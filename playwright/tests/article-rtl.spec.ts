import { test, expect } from "@playwright/test";

test.describe("Страница статьи RTL иконок", () => {
    test.describe("локализована на русский язык (http://127.0.0.1:3000/ru-RU/article/rtl-icons)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/ru-RU/article/rtl-icons");
            await page.waitForTimeout(500);
        });

        test("присутствует текст переводов (Иконки, которые нужно разворачивать)", async ({
            page,
        }) => {
            await expect(
                page.getByText("Иконки, которые нужно разворачивать").first()
            ).toBeVisible();
        });

        test("rtl икони не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("rtl-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.01, // rtl 0.02
            });
        });

        test("not rtl икони не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("not-rtl-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.04, // rtl 0.07
            });
        });

        test("страница локализована", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.04, // en 0.09
            });
        });
    });

    test.describe("локализована на английский язык (http://127.0.0.1:3000/en/article/rtl-icons)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/en/article/rtl-icons");
            await page.waitForTimeout(500);
        });

        test("присутствует текст переводов (Icons that should not be flipped)", async ({
            page,
        }) => {
            await expect(
                page.getByText("Icons that should not be flipped").first()
            ).toBeVisible();
        });

        test("rtl икони не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("rtl-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.01, // rtl 0.02
            });
        });

        test("not rtl икони не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("not-rtl-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.04, // rtl 0.07
            });
        });

        test("страница локализована", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.04, // ru 0.09
            });
        });
    });

    test.describe("локализована на арабский язык (http://127.0.0.1:3000/ar/article/rtl-icons)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/ar/article/rtl-icons");
            await page.waitForTimeout(500);
        });

        test("присутствует текст переводов", async ({ page }) => {
            await expect(
                page.getByText("الأيقونات التي لا يجب قلبها").first()
            ).toBeVisible();
        });

        test("rtl икони развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("rtl-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.01, // ltr 0.02
            });
        });

        test("not rtl икони не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("not-rtl-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.04, // rtl 0.07
            });
        });

        test("страница локализована и соответствует RTL", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.06, // ru 0.13
            });
        });
    });
});
