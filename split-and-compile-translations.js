import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const SUPPORTED_LANGS = ["ru", "en", "ar"];

const PAGE_TRANSLATION_KEYS = {
    homePage: [
        "layout.footer.copyright",
        "homePage.hero.title",
        "homePage.hero.conference",
        "homePage.hero.location",
        "homePage.hero.price",
        "homePage.hero.register",
        "homePage.regionArticle.title",
        "homePage.ruArticle.title",
        "homePage.ruArticle.description",
        "homePage.byArticle.title",
        "homePage.byArticle.description",
        "homePage.kzArticle.title",
        "homePage.kzArticle.description",
        "homePage.arArticle.title",
        "homePage.arArticle.description",
        "homePage.enArticle.title",
        "homePage.enArticle.description",
        "homePage.rtlArticle.title",
        "homePage.rtlArticle.description",
        "homePage.cssArticle.title",
        "homePage.cssArticle.description",
        "homePage.articles.title",
        "homePage.articles.description",
        "homePage.article.read",
    ],
    articleUiBy: [
        "layout.footer.copyright",
        "articleUiBy.title",
        "articleUiBy.text",
    ],

    articleL10nRu: [
        "layout.footer.copyright",
        "articleL10nRu.title",
        "articleL10nRu.text1",
        "articleL10nRu.text2",
    ],
    articleI18nKz: [
        "layout.footer.copyright",
        "articleI18nKz.title",
        "articleI18nKz.text",
    ],
    articleEn: ["layout.footer.copyright", "articleEn.title", "articleEn.text"],
    articleCss: [
        "layout.footer.copyright",
        "articleCss.title",
        "articleCss.intro",
        "articleCss.diff",
        "articleCss.whyImportant.title",
        "articleCss.whyImportant.text",
        "articleCss.whyImportant.list",
        "articleCss.conclusion.title",
        "articleCss.conclusion.text",
    ],
    articleAr: ["layout.footer.copyright", "articleAr.title", "articleAr.text"],
    articleRtlIcons: [
        "layout.footer.copyright",
        "articleRtlIcons.title",
        "articleRtlIcons.intro",
        "articleRtlIcons.whyImportant.title",
        "articleRtlIcons.whyImportant.text",
        "articleRtlIcons.flipIcons.title",
        "articleRtlIcons.flipIcons.text",
        "articleRtlIcons.dontFlipIcons.title",
        "articleRtlIcons.dontFlipIcons.text",
        "articleRtlIcons.conclusion.title",
        "articleRtlIcons.conclusion.text1",
        "articleRtlIcons.conclusion.text2",
    ],
};

const PAGES = [
    { name: "articleAr", path: "src/pages/article-ar" },
    { name: "articleCss", path: "src/pages/article-css" },
    { name: "articleEn", path: "src/pages/article-en" },
    { name: "articleI18nKz", path: "src/pages/article-i18n-kz" },
    { name: "articleL10nRu", path: "src/pages/article-l10n-ru" },
    { name: "articleRtlIcons", path: "src/pages/article-rtl-icons" },
    { name: "articleUiBy", path: "src/pages/article-ui-by" },
    { name: "homePage", path: "src/pages/home" },
];

const { default: translations } = await import("./translations.json", {
    assert: { type: "json" },
});

for (const page of PAGES) {
    const langDir = path.resolve(page.path, "lang");
    const translationKeys = PAGE_TRANSLATION_KEYS[page.name];

    await fs.mkdir(langDir, { recursive: true });

    await Promise.all(
        SUPPORTED_LANGS.map(async (lang) => {
            const langFile = path.resolve(langDir, `${lang}.json`);
            const pageLangTranslations = {};

            for (const key of translationKeys) {
                pageLangTranslations[key] = {
                    defaultMessage: translations[key][lang],
                };
            }

            await fs.writeFile(
                langFile,
                JSON.stringify(pageLangTranslations, null, 4),
                "utf8"
            );

            return execAsync(
                `npx formatjs compile ${langFile} --out-file ${langFile} --ast`
            );
        })
    );
}
