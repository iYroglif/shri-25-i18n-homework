import { test, expect, Page } from "@playwright/test";

test.describe("Определение языка", () => {
    test("показывает интерфейс на языке из куки i18n-l10n-conf-lang", async ({
        page,
    }) => {
        await page.context().addCookies([
            {
                name: "i18n-l10n-conf-lang",
                value: "ar",
                url: "http://127.0.0.1",
            },
        ]);
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ar\/?/);
    });

    test("показывает интерфейс на английском языке, если куки i18n-l10n-conf-lang и Accept-Language заголовок отсутствуют", async ({
        page,
        context,
    }) => {
        await context.route("**/*", (route, request) => {
            route.continue({
                headers: {
                    ...request.headers(),
                    "accept-language": "",
                },
            });
        });
        await page.context().clearCookies();
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/en\/?/);
    });

    test("показывает интерфейс на выявленном языке пользователя, если в урле указан неподдерживаемый язык (http://127.0.0.1:3000/fr; cookie i18n-l10n-conf-lang=ar)", async ({
        page,
    }) => {
        await page.context().addCookies([
            {
                name: "i18n-l10n-conf-lang",
                value: "ar",
                url: "http://127.0.0.1",
            },
        ]);
        await page.goto("/fr");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ar\/?/);
    });

    test("показывает интерфейс на языке из урла, если в урле указан поддерживаемый язык, но неподдерживаемая локаль (http://127.0.0.1:3000/ar-RU)", async ({
        page,
    }) => {
        await page.context().clearCookies();

        await page.goto("/ar-RU");
        await page.waitForLoadState("networkidle");

        await expect(page).toHaveURL(/http:\/\/127.0.0.1:3000\/ar\/?/);
    });
});
