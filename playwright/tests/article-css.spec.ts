import { test, expect } from "@playwright/test";

test.describe("Страница статьи логических свойств CSS", () => {
    test.describe("локализована на русский язык (http://127.0.0.1:3000/ru-RU/article/css)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/ru-RU/article/css");
            await page.waitForTimeout(500);
        });

        test("присутствует текст переводов (Почему это важно для i18n-фронтенда)", async ({
            page,
        }) => {
            await expect(
                page.getByText("Почему это важно для i18n-фронтенда").first()
            ).toBeVisible();
        });

        test("заголовок страницы локализован (Альт)", async ({ page }) => {
            await expect(page).toHaveTitle("Альт");
        });

        test('проставлено корректное значение lang атрибута html-документа (lang="ru")', async ({
            page,
        }) => {
            const lang = await page.evaluate(
                () => document.documentElement.lang
            );

            expect(lang).toBe("ru");
        });

        test("страница локализована", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.02, // en 0.05
            });
        });
    });

    test.describe("локализована на английский язык (http://127.0.0.1:3000/en/article/css)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/en/article/css");
            await page.waitForTimeout(500);
        });

        test("присутствует текст переводов (Why This Matters for i18n Frontend)", async ({
            page,
        }) => {
            await expect(
                page.getByText("Why This Matters for i18n Frontend").first()
            ).toBeVisible();
        });

        test("заголовок страницы локализован (Alt)", async ({ page }) => {
            await expect(page).toHaveTitle("Alt");
        });

        test('проставлено корректное значение lang атрибута html-документа (lang="en")', async ({
            page,
        }) => {
            const lang = await page.evaluate(
                () => document.documentElement.lang
            );

            expect(lang).toBe("en");
        });

        test("страница локализована", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.03, // ru 0.05
            });
        });
    });

    test.describe("локализована на арабский язык (http://127.0.0.1:3000/ar/article/css)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/ar/article/css");
            await page.waitForTimeout(500);
        });

        test("присутствует текст переводов (لماذا هذا مهم لواجهة i18n الأمامية)", async ({
            page,
        }) => {
            await expect(
                page.getByText("لماذا هذا مهم لواجهة i18n الأمامية").first()
            ).toBeVisible();
        });

        test("заголовок страницы локализован (Alt)", async ({ page }) => {
            await expect(page).toHaveTitle("Alt");
        });

        test('проставлено корректное значение lang атрибута html-документа (lang="ar")', async ({
            page,
        }) => {
            const lang = await page.evaluate(
                () => document.documentElement.lang
            );

            expect(lang).toBe("ar");
        });

        test("страница локализована и соответствует RTL", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.02, // ru 0.04
            });
        });
    });
});
