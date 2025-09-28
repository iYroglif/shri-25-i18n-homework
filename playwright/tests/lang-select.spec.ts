import { test, expect } from "@playwright/test";

test.describe("Переключатель языка ", () => {
    test("переключает язык на английский, перенаправляя после выбора языка на соответствующую страницу (http://127.0.0.1:3000/en)", async ({
        page,
    }) => {
        await page.goto("/ru-RU");

        await page.getByTestId("lang-select-button").first().click();
        await page
            .getByTestId("lang-select-menu")
            .first()
            .getByText("English")
            .click();
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/en\/?/);
    });

    test("переключает язык на арабский, перенаправляя после выбора языка на соответствующую страницу (http://127.0.0.1:3000/ar)", async ({
        page,
    }) => {
        await page.goto("/en");

        await page.getByTestId("lang-select-button").first().click();
        await page
            .getByTestId("lang-select-menu")
            .first()
            .getByText("اَلْعَرَبِيَّةُ")
            .click();
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ar\/?/);
    });

    test("переключает язык на русский, перенаправляя после выбора языка на соответствующую страницу (http://127.0.0.1:3000/ru-RU)", async ({
        page,
    }) => {
        await page.goto("/ar");

        await page.getByTestId("lang-select-button").first().click();
        await page
            .getByTestId("lang-select-menu")
            .first()
            .getByText("Русский")
            .click();
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ru-RU\/?/);
    });
});
