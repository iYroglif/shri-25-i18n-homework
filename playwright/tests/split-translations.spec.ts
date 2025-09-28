import { test, expect, Response } from "@playwright/test";

test.describe("Загрузка только необходимых для страницы переводов", () => {
    test("при открытии страницы загружаются переводы только для этой страницы, а переводы для других страниц не загружаются (http://127.0.0.1:3000/ru-RU; Иконки, которые нужно разворачивать)", async ({
        page,
    }) => {
        let response: Response | undefined;

        page.on("response", (res) => {
            if (res.url().endsWith(".js")) {
                response = res;
            }
        });

        await page.goto("/ru-RU");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(500);

        const responseText = await response?.text();

        expect(responseText ?? "").not.toContain(
            "Иконки, которые нужно разворачивать"
        );
    });

    test("при открытии страницы загружаются переводы только для этой страницы, а переводы для других страниц не загружаются (http://127.0.0.1:3000/en; We share recommendations on how to write interface texts)", async ({
        page,
    }) => {
        let response: Response | undefined;

        page.on("response", (res) => {
            if (res.url().endsWith(".js")) {
                response = res;
            }
        });

        await page.goto("/ru-RU");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(500);

        const responseText = await response?.text();

        expect(responseText ?? "").not.toContain(
            "We share recommendations on how to write interface texts"
        );
    });

    test("при переходе на другую страницу загружаются переводы только для этой страницы, а переводы для других страниц не загружаются (http://127.0.0.1:3000/ru-RU -> http://127.0.0.1:3000/ru-RU/article/css; Почему важно разворачивать иконки в RTL?)", async ({
        page,
    }) => {
        let response: Response | undefined;

        page.on("response", (res) => {
            if (res.url().endsWith(".js")) {
                response = res;
            }
        });

        await page.goto("/ru-RU");
        await page
            .getByText(
                "Логические CSS-свойства в интерфейсах с поддержкой i18n"
            )
            .first()
            .click();
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(500);

        const text = await response?.text();

        expect(text ?? "").not.toContain(
            "Почему важно разворачивать иконки в RTL?"
        );

        // Почему важно разворачивать иконки в RTL?
        expect(text ?? "").not.toContain(
            "\\u041f\\u043e\\u0447\\u0435\\u043c\\u0443 \\u0432\\u0430\\u0436\\u043d\\u043e \\u0440\\u0430\\u0437\\u0432\\u043e\\u0440\\u0430\\u0447\\u0438\\u0432\\u0430\\u0442\\u044c \\u0438\\u043a\\u043e\\u043d\\u043a\\u0438 \\u0432 RTL?"
        );
    });
});
