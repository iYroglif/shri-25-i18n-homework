import { test, expect } from "@playwright/test";

test.describe("Главная страница", () => {
    test.describe("локализована на русский язык (http://127.0.0.1:3000/ru-RU)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/ru-RU");
            await page.waitForTimeout(300);
        });

        test("присутствует текст переводов (Конференция I&L-2025)", async ({
            page,
        }) => {
            await expect(
                page.getByText("Конференция I&L-2025").first()
            ).toBeVisible();
        });

        test("дата отображается в корректном формате (15 августа 2025 г.)", async ({
            page,
        }) => {
            await expect(
                page.getByText("15 августа 2025 г.").first()
            ).toBeVisible();
        });

        test("валюта отображается в корректном формате (35 000,00 ₽ билет)", async ({
            page,
        }) => {
            await expect(
                page.getByText("35 000,00 ₽ билет").first()
            ).toBeVisible();
        });

        test("отображается корректная плюральная форма (Всего 2 статьи)", async ({
            page,
        }) => {
            await expect(
                page.getByText("Всего 2 статьи").first()
            ).toBeVisible();
        });

        test("заголовок страницы локализован (Альт)", async ({ page }) => {
            await expect(page).toHaveTitle("Альт");
        });

        test('проставлено корректное значение lang атрибута html-документа (lang="ru")', async ({
            page,
        }) => {
            await page.waitForTimeout(500);
            const lang = await page.evaluate(
                () => document.documentElement.lang
            );

            expect(lang).toBe("ru");
        });

        test("икони социальных сетей не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("social-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.03, // 0.06
            });
        });

        test("страница локализована", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.01, // en 0.02
            });
        });
    });

    test.describe("локализована на английский язык (http://127.0.0.1:3000/en)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/en");
            await page.waitForTimeout(300);
        });

        test("присутствует текст переводов (I&L Conference 2025)", async ({
            page,
        }) => {
            await expect(
                page.getByText("I&L Conference 2025").first()
            ).toBeVisible();
        });

        test("дата отображается в корректном формате (August 15, 2025)", async ({
            page,
        }) => {
            await expect(
                page.getByText("August 15, 2025").first()
            ).toBeVisible();
        });

        test("валюта отображается в корректном формате (RUB 35,000.00 ticket)", async ({
            page,
        }) => {
            await expect(
                page.getByText("RUB 35,000.00 ticket").first()
            ).toBeVisible();
        });

        test("отображается корректная плюральная форма (Total 2 articles)", async ({
            page,
        }) => {
            await expect(
                page.getByText("Total 2 articles").first()
            ).toBeVisible();
        });

        test("заголовок страницы локализован (Alt)", async ({ page }) => {
            await expect(page).toHaveTitle("Alt");
        });

        test('проставлено корректное значение lang атрибута html-документа (lang="en")', async ({
            page,
        }) => {
            await page.waitForTimeout(500);
            const lang = await page.evaluate(
                () => document.documentElement.lang
            );

            expect(lang).toBe("en");
        });

        test("икони социальных сетей не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("social-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.03, // 0.06
            });
        });

        test("страница локализована", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.01, // ru 0.02
            });
        });
    });

    test.describe("локализована на арабский язык (http://127.0.0.1:3000/ar)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/ar");
            await page.waitForTimeout(300);
        });

        test("присутствует текст переводов (مؤتمر)", async ({ page }) => {
            await expect(page.getByText("مؤتمر").first()).toBeVisible();
        });

        test("дата отображается в корректном формате (15 أغسطس 2025)", async ({
            page,
        }) => {
            await expect(page.getByText("15 أغسطس 2025").first()).toBeVisible();
        });

        test("валюта отображается в корректном формате (35,000.00 RUB تذكرة)", async ({
            page,
        }) => {
            await expect(
                page.getByText("35,000.00 RUB تذكرة").first()
            ).toBeVisible();
        });

        test("отображается корректная плюральная форма (إجمالي 2 مقالتين)", async ({
            page,
        }) => {
            await expect(
                page.getByText("إجمالي 2 مقالتين").first()
            ).toBeVisible();
        });

        test("заголовок страницы локализован", async ({ page }) => {
            await expect(page).toHaveTitle("Alt");
        });

        test('проставлено корректное значение lang атрибута html-документа (lang="ar")', async ({
            page,
        }) => {
            await page.waitForTimeout(500);
            const lang = await page.evaluate(
                () => document.documentElement.lang
            );

            expect(lang).toBe("ar");
        });

        test("икони социальных сетей не развернуты", async ({ page }) => {
            await expect(
                page.getByTestId("social-icons").first()
            ).toHaveScreenshot({
                maxDiffPixelRatio: 0.03, // 0.06
            });
        });

        test("страница локализована и соответствует RTL", async ({ page }) => {
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveScreenshot({
                fullPage: true,
                maxDiffPixelRatio: 0.025, // imgs 0.02 ru 0.02
            });
        });
    });
});
