import { test, expect, Response } from "@playwright/test";

test.describe("Отсутствие исходных текстов на русском языке", () => {
    test("при открытии страницы на английском языке не загружаются текста на языке по умолчанию (http://127.0.0.1:3000/en; отсутствуют defaultMessage)", async ({
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

        expect(responseText ?? "").not.toContain("ذو صلة بمنطقتك");
    });

    test("при открытии страницы на арабском языке не загружаются текста на языке по умолчанию (http://127.0.0.1:3000/ar; отсутствуют defaultMessage)", async ({
        page,
    }) => {
        let response: Response | undefined;

        page.on("response", (res) => {
            if (res.url().endsWith(".js") && !response) {
                response = res;
            }
        });

        await page.goto("/ar");
        await page.waitForLoadState("networkidle");

        const responseText = await response?.text();

        expect(responseText ?? "").not.toContain(
            "Актуально для вашего региона"
        );

        expect(responseText ?? "").not.toContain("Relevant for your region");
    });
});
