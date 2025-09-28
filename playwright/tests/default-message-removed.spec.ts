import { test, expect, Response } from "@playwright/test";

test.describe("Отсутствие исходных текстов на русском языке", () => {
    test("при открытии страницы на английском языке не загружаются текста по умолчанию на русском языке (http://127.0.0.1:3000/en; отсутствуют defaultMessage)", async ({
        page,
    }) => {
        let response: Response | undefined;

        page.on("response", (res) => {
            if (res.url().endsWith(".js") && !response) {
                response = res;
            }
        });

        await page.goto("/en");
        await page.waitForLoadState("networkidle");

        const responseText = await response?.text();

        expect(responseText ?? "").not.toContain(
            "Актуально для вашего региона"
        );
    });
});
