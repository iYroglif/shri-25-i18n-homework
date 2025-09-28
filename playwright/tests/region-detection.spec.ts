import { test, expect, Page } from "@playwright/test";

test.describe("Определение региона", () => {
    test("перенаправляет на регион RU при отсутствии региона в URL (http://127.0.0.1:3000/ru)", async ({
        page,
    }) => {
        await page.goto("/ru");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ru-RU\/?/);
    });

    test("перенаправляет на регион RU при неподдерживаемом регионе в URL (http://127.0.0.1:3000/ru-KZ)", async ({
        page,
    }) => {
        await page.goto("/ru-KZ");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ru-RU\/?/);
    });

    test("сохраняет язык при поддерживаемом языке в URL, но неподдерживаемой локали (http://127.0.0.1:3000/ar-RU)", async ({
        page,
    }) => {
        await page.goto("/ar-RU");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ar\/?/);
    });

    test("корректно отображает региональный контент для RU региона (http://127.0.0.1:3000/ru-RU; Как адаптировать веб-приложение под российских пользователей: нюансы локализации)", async ({
        page,
    }) => {
        await page.goto("/ru-RU");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ru-RU\/?/);

        await expect(
            page
                .getByText(
                    "Как адаптировать веб-приложение под российских пользователей: нюансы локализации"
                )
                .first()
        ).toBeVisible();
    });

    test("корректно отображает региональный контент для BY региона (http://127.0.0.1:3000/ru-BY?devOverrideRegion=BY; Двухъязычный интерфейс: как учесть русский и белорусский языки в одном продукте)", async ({
        page,
    }) => {
        await page.goto("/ru-BY?devOverrideRegion=BY");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ru-BY\/?/);

        await expect(
            page
                .getByText(
                    "Двухъязычный интерфейс: как учесть русский и белорусский языки в одном продукте"
                )
                .first()
        ).toBeVisible();
    });

    test("корректно отображает региональный контент для KZ региона (http://127.0.0.1:3000/ru-KZ?devOverrideRegion=KZ; Русский и казахский: эффективная локализация для Казахстана)", async ({
        page,
    }) => {
        await page.goto("/ru-KZ?devOverrideRegion=KZ");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ru-KZ\/?/);

        await expect(
            page
                .getByText(
                    "Русский и казахский: эффективная локализация для Казахстана"
                )
                .first()
        ).toBeVisible();
    });
});
