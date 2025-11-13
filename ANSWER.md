# Разбор решения задачи по интернационализации фронтенд-приложения

В этом разборе подробно описано, как реализована поддержка интернационализации (i18n) для проекта международной конференции

### Шаг 1. Реализация i18n-роутинга и переключателя языка

Реализуем i18n-роутинг с логикой определения языка и региона пользователя из условия задачи:

`src/App.tsx`

```tsx
import Cookies from "js-cookie";
import { type FC, useEffect, useLayoutEffect } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
    useParams,
} from "react-router-dom";

import {
    BRAND_NAMES,
    DEFAULT_LANG,
    LANG_COOKIE_NAME,
    LANG_DIRECTION,
    SUPPORTED_LANGS,
    SUPPORTED_LOCALES,
} from "./constants";
import { geoService } from "./lib";
import {
    ArticleAr,
    ArticleCss,
    ArticleEn,
    ArticleI18nKz,
    ArticleL10nRu,
    ArticleRtlIcons,
    ArticleUiBy,
    Home,
} from "./pages";
import type { Lang, Locale } from "./types";

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const LocaleNavigate: FC = () => {
    const { locale = "" } = useParams();

    const lang = locale.split("-")[0];

    const getLang = (): Lang => {
        if (SUPPORTED_LANGS.includes(lang as Lang)) {
            return lang as Lang;
        }

        const cookieLang = Cookies.get(LANG_COOKIE_NAME);
        if (cookieLang && SUPPORTED_LANGS.includes(cookieLang as Lang)) {
            return cookieLang as Lang;
        }

        const browserLang = navigator.languages.find((lang) =>
            SUPPORTED_LANGS.includes(lang as Lang)
        );
        if (browserLang) {
            return browserLang as Lang;
        }

        return DEFAULT_LANG;
    };

    const region = geoService.getCurrentRegion(window.location.search);
    const newLang = getLang();

    useLayoutEffect(() => {
        document.title = BRAND_NAMES[newLang];
        document.documentElement.lang = newLang;
        document.documentElement.dir = LANG_DIRECTION[newLang];
    }, [newLang]);

    const getLocale = (): Locale => {
        const newLocale = [newLang, region].filter(Boolean).join("-");
        if (SUPPORTED_LOCALES.includes(newLocale as Locale)) {
            return newLocale as Locale;
        }

        return newLang;
    };

    const { pathname, search, hash } = useLocation();

    const newLocale = getLocale();
    if (newLocale !== locale) {
        return (
            <Navigate
                to={{
                    pathname: pathname.replace(locale, newLocale),
                    search,
                    hash,
                }}
                replace
            />
        );
    }

    return <Outlet />;
};

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<LocaleNavigate />}>
                    <Route path=":locale">
                        <Route index element={<Home />} />

                        <Route path="article">
                            <Route
                                path="rtl-icons"
                                element={<ArticleRtlIcons />}
                            />
                            <Route path="css" element={<ArticleCss />} />
                            <Route path="l10n-ru" element={<ArticleL10nRu />} />
                            <Route path="ui-by" element={<ArticleUiBy />} />
                            <Route path="i18n-kz" element={<ArticleI18nKz />} />
                            <Route path="en" element={<ArticleEn />} />
                            <Route path="ar" element={<ArticleAr />} />
                        </Route>

                        <Route
                            path="*"
                            element={<Navigate to="/:locale" replace />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

Добавим логику переключения языка с учетом реализованного i18n-роутинга в компонент выбора языка:

`src/components/lang-select/LangSelect.tsx`

```tsx
import { type FC, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { SUPPORTED_LANGS } from "@/constants";
import { useLang } from "@/hooks";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    const selectedLang = useLang();
    const { pathname, search, hash } = useLocation();

    const handleMenuClose = useCallback(() => {
        setShowMenu(false);
    }, []);

    const handleMenuToggle = useCallback(() => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    }, []);

    const langSelectRef = useClickOutside<HTMLDivElement>(handleMenuClose);

    return (
        <div className={styles.langSelect} ref={langSelectRef}>
            <button
                className={styles.langSelectButton}
                onClick={handleMenuToggle}
                data-testid="lang-select-button"
            >
                <span className={styles.langSelectText}>
                    {LANG_LABEL[selectedLang]}
                </span>

                <EarthIcon />
            </button>

            {showMenu && (
                <ul
                    className={styles.langSelectMenu}
                    data-testid="lang-select-menu"
                >
                    {SUPPORTED_LANGS.map((lang) => {
                        const langName = LANG_LABEL[lang];

                        return (
                            <Link
                                key={lang}
                                to={{
                                    pathname: pathname.replace(
                                        selectedLang,
                                        lang
                                    ),
                                    search,
                                    hash,
                                }}
                            >
                                <li
                                    className={styles.langSelectMenuItem}
                                    key={lang}
                                    onClick={handleMenuClose}
                                >
                                    <span
                                        className={
                                            styles.langSelectMenuItemText
                                        }
                                    >
                                        {langName}
                                    </span>

                                    {lang === selectedLang && <DoneIcon />}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
```

Добавим правильное отображение названия бренда в зависимости от локали с учетом реализованного i18n-роутинга:

`src/components/layout/Layout.tsx`

```tsx
import type { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { BRAND_NAMES } from "@/constants";
import { useLocale } from "@/hooks";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";

import { LangSelect } from "../lang-select";
import styles from "./styles.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const locale = useLocale();

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <Link className={styles.headerBrand} to="/">
                        <BrandLogoIcon />

                        <span className={styles.headerBrandText}>
                            {BRAND_NAMES[locale]}
                        </span>
                    </Link>

                    <LangSelect />
                </div>
            </div>

            <div className={styles.contentContainer}>{children}</div>

            <div className={styles.footer}>
                <div
                    className={styles.footerSocialLinks}
                    data-testid="social-icons"
                >
                    {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                        <a key={index} href="">
                            <Icon />
                        </a>
                    ))}
                </div>

                <span className={styles.footerText}>
                    © 2024-2025, ООО «
                    <a className={styles.textLink} href="">
                        {BRAND_NAMES[locale]}
                    </a>
                    ». Все права защищены
                </span>
            </div>
        </>
    );
};
```

Добавим отображение определенных статей в блоке "Актуально для вашего региона" в зависимости от региона пользователя с учетом реализованного i18n-роутинга:

`src/pages/home/Home.tsx`

```tsx
import { type FC } from "react";
import { Link } from "react-router-dom";

import articleAr from "@/assets/article-ar.jpg";
import articleCss from "@/assets/article-css.jpg";
import articleEn from "@/assets/article-en.jpg";
import articleI18nKz from "@/assets/article-i18n-kz.jpg";
import articleL10nRu from "@/assets/article-l10n-ru.jpg";
import articleRtlIcons from "@/assets/article-rtl-icons.jpg";
import articleUiBy from "@/assets/article-ui-by.jpg";
import { Layout } from "@/components";
import { useLocale } from "@/hooks";
import type { Locale } from "@/types";

import styles from "./styles.module.css";

const ARTICLES = [
    {
        title: "Какие иконки нужно разворачивать для RTL, а какие — нет?",
        description:
            "Не все иконки требуют зеркального отражения при переключении на RTL-языки. Разбираемся, какие иконки зависят от направления текста, а какие — универсальны",
        imageUrl: articleRtlIcons,
        articleLink: "article/rtl-icons",
    },
    {
        title: "Логические CSS-свойства в интерфейсах с поддержкой i18n",
        description:
            "Узнайте, как логические CSS-свойства помогают создавать адаптивные интерфейсы для разных языков и направлений письма — без усложнения кода и дублирования стилей.",
        imageUrl: articleCss,
        articleLink: "article/css",
    },
];

const getRegionArticleByLocale = (locale: Locale) => {
    switch (locale) {
        case "ru":
        case "ru-RU":
            return {
                title: "Как адаптировать веб-приложение под российских пользователей: нюансы локализации",
                description:
                    "Изучаем предпочтения русскоязычных пользователей, числовые и валютные форматы, перевод интерфейса и юридические аспекты (например, закон о персональных данных)",
                imageUrl: articleL10nRu,
                articleLink: "article/l10n-ru",
            };

        case "ru-BY":
            return {
                title: "Двухъязычный интерфейс: как учесть русский и белорусский языки в одном продукте",
                description:
                    "Рассматриваем подходы к реализации двуязычного интерфейса, стандарты перевода и культурные отличия. Особое внимание — контенту на белорусском языке",
                imageUrl: articleUiBy,
                articleLink: "article/ui-by",
            };

        case "ru-KZ":
            return {
                title: "Русский и казахский: эффективная локализация для Казахстана",
                description:
                    "Разбираем сценарии, когда приложение должно быть доступно сразу на двух языках, и особенности казахской локали (в т.ч. поддержка латиницы и кириллицы, особенности форматов дат)",
                imageUrl: articleI18nKz,
                articleLink: "article/i18n-kz",
            };

        case "ar":
            return {
                title: "Локализация для арабоязычного мира: RTL, форматы и культурные коды",
                description:
                    "От адаптации интерфейса под направление письма справа налево до выбора правильных формулировок — ключевые аспекты локализации для стран Ближнего Востока и Северной Африки",
                imageUrl: articleAr,
                articleLink: "article/ar",
            };

        case "en":
        default:
            return {
                title: "Проектирование для глобальной аудитории: английский как универсальный язык",
                description:
                    "Почему английский часто используется как язык по умолчанию в международных приложениях и как писать интерфейсные тексты, которые будут понятны, культурно нейтральны и удобны для последующей локализации",
                imageUrl: articleEn,
                articleLink: "article/en",
            };
    }
};

export const Home: FC = () => {
    const locale = useLocale();

    const { title, description, imageUrl, articleLink } =
        getRegionArticleByLocale(locale);

    return (
        <Layout>
            <main className={styles.content}>
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        Соединяем цифровые миры на всех языках
                    </h1>

                    <div className={styles.heroDetails}>
                        <span className={styles.heroDetailsItem}>
                            Конференция I&L-2025
                        </span>

                        <span className={styles.heroDetailsItem}>
                            15 августа 2025 г.
                        </span>

                        <span className={styles.heroDetailsItem}>
                            Москва, Россия
                        </span>

                        <span className={styles.heroDetailsItem}>
                            35 000,00 ₽ билет
                        </span>
                    </div>

                    <a className={styles.heroRegister} href="">
                        Зарегистрироваться
                    </a>
                </section>

                <section className={styles.regionArticle}>
                    <h2 className={styles.regionArticleTitle}>
                        Актуально для вашего региона
                    </h2>

                    <Link className={styles.articleCard} to={articleLink}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{title}</h3>

                            <p className={styles.cardDescription}>
                                {description}
                            </p>

                            <span className={styles.cardRead}>Читать</span>
                        </div>

                        <img className={styles.cardImage} src={imageUrl} />
                    </Link>
                </section>

                <section className={styles.articles}>
                    <h2 className={styles.articlesTitle}>Статьи</h2>

                    {ARTICLES.length > 0 && (
                        <p className={styles.articlesDescription}>
                            Всего {ARTICLES.length} статьи
                        </p>
                    )}

                    <div className={styles.articlesList}>
                        {ARTICLES.map(
                            (
                                { title, description, imageUrl, articleLink },
                                index
                            ) => (
                                <Link
                                    key={index}
                                    className={styles.articleCard}
                                    to={articleLink}
                                >
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>
                                            {title}
                                        </h3>

                                        <p className={styles.cardDescription}>
                                            {description}
                                        </p>

                                        <span className={styles.cardRead}>
                                            Читать
                                        </span>
                                    </div>

                                    <img
                                        className={styles.cardImage}
                                        src={imageUrl}
                                    />
                                </Link>
                            )
                        )}
                    </div>
                </section>
            </main>
        </Layout>
    );
};
```

### Шаг 2. Добавление переводов (Code-First подход) и их распределение по страницам приложения

Добавим скрипт распределения переводов по страницам приложения в виде {lang}.json файлов:

`split-translations.js`

```js
import fs from "node:fs/promises";
import path from "node:path";

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
        SUPPORTED_LANGS.map((lang) => {
            const langFile = path.resolve(langDir, `${lang}.json`);
            const pageLangTranslations = {};

            for (const key of translationKeys) {
                pageLangTranslations[key] = translations[key][lang];
            }

            return fs.writeFile(
                langFile,
                JSON.stringify(pageLangTranslations, null, 4),
                "utf8"
            );
        })
    );
}
```

Добавим компонент провайдер для загрузки необходимых переводов для страницы из json файлов с помощью библиотеки react-query:

`src/providers/TranslationsProvider.tsx`

```tsx
import { useQuery } from "@tanstack/react-query";
import { type FC, type PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";

import { Loader } from "@/components";
import { useLang, useLocale } from "@/hooks";
import type { Lang } from "@/types";

interface TranslationsProviderProps extends PropsWithChildren {
    getTranslations: (
        lang: Lang
    ) => Promise<{ default: Record<string, string> }>;
}

export const TranslationsProvider: FC<TranslationsProviderProps> = ({
    getTranslations,
    children,
}) => {
    const locale = useLocale();
    const translationsLang = useLang();

    const { isLoading, data } = useQuery({
        queryKey: [translationsLang],
        queryFn: () => getTranslations(translationsLang),
    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <IntlProvider locale={locale} messages={data?.default}>
            {children}
        </IntlProvider>
    );
};
```

Заменим все захардкоженные текста в проекте на Code First подход с использованием библиотеки react-intl. Добавим `TranslationsProvider` для загрузки переводов на определенную страницу статьи. Пример для страницы `article-en`:

`src/pages/article-en/ArticleEn.tsx`

```tsx
import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { TranslationsProvider } from "@/providers";
import type { Lang } from "@/types";

import styles from "./styles.module.css";

const getTranslations = (lang: Lang) => import(`./lang/${lang}.json`);

export const ArticleEn: FC = () => (
    <TranslationsProvider getTranslations={getTranslations}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleEn.title"
                        defaultMessage="Проектирование для глобальной аудитории: английский как универсальный язык"
                    />
                </h1>

                <p>
                    <FormattedMessage
                        id="articleEn.text"
                        defaultMessage="Английский язык часто используется в интерфейсах как универсальный, особенно на этапе MVP или при работе на международный рынок. Мы делимся рекомендациями, как писать интерфейсные тексты, которые останутся понятными, нейтральными и легко поддающимися переводу в будущем."
                    />
                </p>
            </main>
        </Layout>
    </TranslationsProvider>
);
```

Пример json файла с переводами:

`src/pages/article-en/lang/ru.json`

```json
{
    "layout.footer.copyright": "© {yearStart}-{yearEnd}, ООО «<link>{brand}</link>». Все права защищены",
    "articleEn.title": "Проектирование для глобальной аудитории: английский как универсальный язык",
    "articleEn.text": "Английский язык часто используется в интерфейсах как универсальный, особенно на этапе MVP или при работе на международный рынок. Мы делимся рекомендациями, как писать интерфейсные тексты, которые останутся понятными, нейтральными и легко поддающимися переводу в будущем."
}
```

### Шаг 3. Поддержка RTL и миграция на логические CSS-свойства

Добавим правило для использования логических CSS-свойств в stylelint конфиг:

`.stylelintrc.json`

```json
{
    "extends": ["stylelint-config-standard", "stylelint-config-clean-order"],
    "ignoreFiles": ["node_modules/**/*", "dist/**/*"],
    "plugins": ["stylelint-use-logical"],
    "rules": {
        "selector-class-pattern": null,
        "csstools/use-logical": true
    }
}
```

Доработаем компонент страницы `article-rtl-icons` для правильной работы отображения иконок при RTL:

`src/pages/article-rtl-icons/ArticleRtlIcons.tsx`

```tsx
import cn from "classnames";
import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { LANG_DIRECTION } from "@/constants";
import { useLang } from "@/hooks";
import {
    ClockIcon,
    GamepadIcon,
    MagnifierIcon,
    MessageIcon,
    PaperNoteIcon,
    WindowIcon,
} from "@/icons";
import { TranslationsProvider } from "@/providers";
import type { Lang } from "@/types";

import styles from "./styles.module.css";

const getTranslations = (lang: Lang) => import(`./lang/${lang}.json`);

export const ArticleRtlIcons: FC = () => {
    const lang = useLang();

    const isRtl = LANG_DIRECTION[lang] === "rtl";

    return (
        <TranslationsProvider getTranslations={getTranslations}>
            <Layout>
                <main className={styles.article}>
                    <h1>
                        <FormattedMessage
                            id="articleRtlIcons.title"
                            defaultMessage="Какие иконки нужно разворачивать для RTL, {br} а какие — нет?"
                            values={{ br: <br /> }}
                        />
                    </h1>

                    <p>
                        <FormattedMessage
                            id="articleRtlIcons.intro"
                            defaultMessage="При адаптации интерфейсов под языки с письмом справа налево (RTL) важно учитывать не только верстку и тексты, но и визуальные элементы. Многие иконки требуют зеркального отражения, а другие должны оставаться в оригинальном виде. Неправильное отображение может сделать интерфейс менее интуитивным и запутать пользователя."
                        />
                    </p>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.whyImportant.title"
                                defaultMessage="Почему важно разворачивать иконки в RTL?"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.whyImportant.text"
                                defaultMessage="В RTL-интерфейсах меняется не только направление текста, но и логика взаимодействия. Иконки с явной направленностью должны отражать это изменение, чтобы сохранить естественный поток восприятия и соответствовать ожиданиям пользователя."
                            />
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.flipIcons.title"
                                defaultMessage="Иконки, которые нужно разворачивать"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.flipIcons.text"
                                defaultMessage="Разворачивайте иконки, которые имеют явное направление или асимметричную форму (за исключением примеров, которые мы рассмотрим позже в статье). Например, иконка заметок с явным направлением текста, асимметричная иконка пользовательского интерфейса окна приложения или иконка сообщения. Примеры таких иконок:"
                            />
                        </p>

                        <div
                            className={cn(styles.icons, {
                                [styles.rtl]: isRtl,
                            })}
                            data-testid="rtl-icons"
                        >
                            <PaperNoteIcon />
                            <MessageIcon />
                            <WindowIcon />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.dontFlipIcons.title"
                                defaultMessage="Иконки, которые не нужно разворачивать"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.dontFlipIcons.text"
                                defaultMessage="Можно не разворачивать симметричные иконки. Иконки, которые являются логотипом или представляют бренд тоже не следует зеркалить — они должны оставаться узнаваемыми. Особое внимание уделите элементам, которые подчиняются «правилу правой руки» — если иконка интуитивно ассоциируется с действием правой руки (как держание предмета), её ориентация должна сохраняться независимо от направления письма. Примеры таких иконок:"
                            />
                        </p>

                        <div
                            className={styles.icons}
                            data-testid="not-rtl-icons"
                        >
                            <GamepadIcon />
                            <MagnifierIcon />
                            <ClockIcon />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.conclusion.title"
                                defaultMessage="Заключение"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.conclusion.text1"
                                defaultMessage="Грамотная работа с иконками в RTL-интерфейсах — важная часть локализации. Это не просто техническая деталь, а способ сделать интерфейс по-настоящему удобным для пользователей с разными культурными особенностями."
                            />
                        </p>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.conclusion.text2"
                                defaultMessage="<strong>Рекомендация:</strong> Разработайте внутренние стандарты для дизайнеров и разработчиков, чтобы обеспечить единый подход к работе с иконками во всех локализациях продукта."
                                values={{
                                    strong: (chunks) => (
                                        <strong>{chunks}</strong>
                                    ),
                                }}
                            />
                        </p>
                    </section>
                </main>
            </Layout>
        </TranslationsProvider>
    );
};
```

`src/pages/article-rtl-icons/styles.module.css`

```css
.article {
    display: flex;
    flex-direction: column;
    gap: 36px;
    max-width: 928px;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.icons {
    display: flex;
    gap: 64px;
    align-items: center;
    justify-content: center;
}

.icons.rtl > svg {
    transform: scaleX(-1);
}
```

Выполним скрипт `npm run stylelint:fix` и мигрируем css файлы на использование логических свойств. Пример мигрированного css файла:

`src/pages/article-css/styles.module.css`

```css
.article {
    display: flex;
    flex-direction: column;
    gap: 36px;
    max-inline-size: 928px;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.list {
    margin-block-start: 12px;
    padding-inline-start: 32px;
}
```

### Шаг 4. Удаление `defaultMessage` из сборки

Настроим vite конфиг для удаления defaultMessage при сборке приложения:

`vite.config.ts`

```ts
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    plugins: [
        react({
            babel: {
                plugins: [["formatjs", { removeDefaultMessage: true }]],
            },
        }),
        svgr({
            include: "**/*.svg",
        }),
    ],
});
```

### Шаг 5. Компиляция переводов и отключение ICU парсера во время сборки

Доработаем скрипт распределения переводов по страницам приложения добавив в него компиляцию переводов:

`split-and-compile-translations.js`

```js
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
```

Исключим ICU парсера во время сборки приложения:

`vite.config.ts`

```ts
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            {
                find: "@formatjs/icu-messageformat-parser",
                replacement: "@formatjs/icu-messageformat-parser/no-parser",
            },
        ],
    },
    plugins: [
        react({
            babel: {
                plugins: [["formatjs", { removeDefaultMessage: true }]],
            },
        }),
        svgr({
            include: "**/*.svg",
        }),
    ],
});
```

Пример json файла с компилированными переводами:

`src/pages/article-en/lang/ru.json`

```json
{
    "articleEn.text": [
        {
            "type": 0,
            "value": "Английский язык часто используется в интерфейсах как универсальный, особенно на этапе MVP или при работе на международный рынок. Мы делимся рекомендациями, как писать интерфейсные тексты, которые останутся понятными, нейтральными и легко поддающимися переводу в будущем."
        }
    ],
    "articleEn.title": [
        {
            "type": 0,
            "value": "Проектирование для глобальной аудитории: английский как универсальный язык"
        }
    ],
    "layout.footer.copyright": [
        {
            "type": 0,
            "value": "© "
        },
        {
            "type": 1,
            "value": "yearStart"
        },
        {
            "type": 0,
            "value": "-"
        },
        {
            "type": 1,
            "value": "yearEnd"
        },
        {
            "type": 0,
            "value": ", ООО «"
        },
        {
            "children": [
                {
                    "type": 1,
                    "value": "brand"
                }
            ],
            "type": 8,
            "value": "link"
        },
        {
            "type": 0,
            "value": "». Все права защищены"
        }
    ]
}
```

### Примечание

Полный список изменений файлов проекта можно посмотреть в этом [Pull request на GitHub](https://github.com/iYroglif/shri-25-i18n-homework/pull/2/files)
