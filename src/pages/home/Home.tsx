import { type FC } from "react";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";
import { Link } from "react-router-dom";

import articleAr from "@/assets/article-ar.jpg";
import articleCss from "@/assets/article-css.jpg";
import articleEn from "@/assets/article-en.jpg";
import articleI18nKz from "@/assets/article-i18n-kz.jpg";
import articleL10nRu from "@/assets/article-l10n-ru.jpg";
import articleRtlIcons from "@/assets/article-rtl-icons.jpg";
import articleUiBy from "@/assets/article-ui-by.jpg";
import { Layout } from "@/components";
import { CONFERENCE_DATE } from "@/constants";
import { useLocale } from "@/hooks";
import { TranslationsProvider } from "@/providers";
import type { Lang, Locale } from "@/types";

import styles from "./styles.module.css";

const getTranslations = (lang: Lang) => import(`./lang/${lang}.json`);

const getRegionArticleByLocale = (locale: Locale) => {
    switch (locale) {
        case "ru":
        case "ru-RU":
            return {
                title: (
                    <FormattedMessage
                        id="homePage.ruArticle.title"
                        defaultMessage="Как адаптировать веб-приложение под российских пользователей: нюансы локализации"
                    />
                ),
                description: (
                    <FormattedMessage
                        id="homePage.ruArticle.description"
                        defaultMessage="Изучаем предпочтения русскоязычных пользователей, числовые и валютные форматы, перевод интерфейса и юридические аспекты (например, закон о персональных данных)"
                    />
                ),
                imageUrl: articleL10nRu,
                articleLink: "article/l10n-ru",
            };

        case "ru-BY":
            return {
                title: (
                    <FormattedMessage
                        id="homePage.byArticle.title"
                        defaultMessage="Двухъязычный интерфейс: как учесть русский и белорусский языки в одном продукте"
                    />
                ),
                description: (
                    <FormattedMessage
                        id="homePage.byArticle.description"
                        defaultMessage="Рассматриваем подходы к реализации двуязычного интерфейса, стандарты перевода и культурные отличия. Особое внимание — контенту на белорусском языке"
                    />
                ),
                imageUrl: articleUiBy,
                articleLink: "article/ui-by",
            };

        case "ru-KZ":
            return {
                title: (
                    <FormattedMessage
                        id="homePage.kzArticle.title"
                        defaultMessage="Русский и казахский: эффективная локализация для Казахстана"
                    />
                ),
                description: (
                    <FormattedMessage
                        id="homePage.kzArticle.description"
                        defaultMessage="Разбираем сценарии, когда приложение должно быть доступно сразу на двух языках, и особенности казахской локали (в т.ч. поддержка латиницы и кириллицы, особенности форматов дат)"
                    />
                ),
                imageUrl: articleI18nKz,
                articleLink: "article/i18n-kz",
            };

        case "ar":
            return {
                title: (
                    <FormattedMessage
                        id="homePage.arArticle.title"
                        defaultMessage="Локализация для арабоязычного мира: RTL, форматы и культурные коды"
                    />
                ),
                description: (
                    <FormattedMessage
                        id="homePage.arArticle.description"
                        defaultMessage="От адаптации интерфейса под направление письма справа налево до выбора правильных формулировок — ключевые аспекты локализации для стран Ближнего Востока и Северной Африки"
                    />
                ),
                imageUrl: articleAr,
                articleLink: "article/ar",
            };

        case "en":
        default:
            return {
                title: (
                    <FormattedMessage
                        id="homePage.enArticle.title"
                        defaultMessage="Проектирование для глобальной аудитории: английский как универсальный язык"
                    />
                ),
                description: (
                    <FormattedMessage
                        id="homePage.enArticle.description"
                        defaultMessage="Почему английский часто используется как язык по умолчанию в международных приложениях и как писать интерфейсные тексты, которые будут понятны, культурно нейтральны и удобны для последующей локализации"
                    />
                ),
                imageUrl: articleEn,
                articleLink: "article/en",
            };
    }
};

export const Home: FC = () => {
    const locale = useLocale();

    const { title, description, imageUrl, articleLink } =
        getRegionArticleByLocale(locale);

    const articles = [
        {
            title: (
                <FormattedMessage
                    id="homePage.rtlArticle.title"
                    defaultMessage="Какие иконки нужно разворачивать для RTL, а какие — нет?"
                />
            ),
            description: (
                <FormattedMessage
                    id="homePage.rtlArticle.description"
                    defaultMessage="Не все иконки требуют зеркального отражения при переключении на RTL-языки. Разбираемся, какие иконки зависят от направления текста, а какие — универсальны"
                />
            ),
            imageUrl: articleRtlIcons,
            articleLink: "article/rtl-icons",
        },
        {
            title: (
                <FormattedMessage
                    id="homePage.cssArticle.title"
                    defaultMessage="Логические CSS-свойства в интерфейсах с поддержкой i18n"
                />
            ),
            description: (
                <FormattedMessage
                    id="homePage.cssArticle.description"
                    defaultMessage="Узнайте, как логические CSS-свойства помогают создавать адаптивные интерфейсы для разных языков и направлений письма — без усложнения кода и дублирования стилей."
                />
            ),
            imageUrl: articleCss,
            articleLink: "article/css",
        },
    ];

    return (
        <TranslationsProvider getTranslations={getTranslations}>
            <Layout>
                <main className={styles.content}>
                    <section className={styles.hero}>
                        <h1 className={styles.heroTitle}>
                            <FormattedMessage
                                id="homePage.hero.title"
                                defaultMessage="Соединяем цифровые миры на всех языках"
                            />
                        </h1>

                        <div className={styles.heroDetails}>
                            <span className={styles.heroDetailsItem}>
                                <FormattedMessage
                                    id="homePage.hero.conference"
                                    defaultMessage="Конференция I&L-{year}"
                                    values={{
                                        year: (
                                            <FormattedDate
                                                value={
                                                    new Date(CONFERENCE_DATE)
                                                }
                                                year="numeric"
                                                numberingSystem="latn"
                                            />
                                        ),
                                    }}
                                />
                            </span>

                            <span className={styles.heroDetailsItem}>
                                <FormattedDate
                                    value={new Date(CONFERENCE_DATE)}
                                    year="numeric"
                                    month="long"
                                    day="numeric"
                                    numberingSystem="latn"
                                />
                            </span>

                            <span className={styles.heroDetailsItem}>
                                <FormattedMessage
                                    id="homePage.hero.location"
                                    defaultMessage="Москва, Россия"
                                />
                            </span>

                            <span className={styles.heroDetailsItem}>
                                <FormattedMessage
                                    id="homePage.hero.price"
                                    defaultMessage="{price} билет"
                                    values={{
                                        price: (
                                            <FormattedNumber
                                                value={35_000}
                                                style="currency"
                                                currency="RUB"
                                                numberingSystem="latn"
                                            />
                                        ),
                                    }}
                                />
                            </span>
                        </div>

                        <a className={styles.heroRegister} href="">
                            <FormattedMessage
                                id="homePage.hero.register"
                                defaultMessage="Зарегистрироваться"
                            />
                        </a>
                    </section>

                    <section className={styles.regionArticle}>
                        <h2 className={styles.regionArticleTitle}>
                            <FormattedMessage
                                id="homePage.regionArticle.title"
                                defaultMessage="Актуально для вашего региона"
                            />
                        </h2>

                        <Link className={styles.articleCard} to={articleLink}>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{title}</h3>

                                <p className={styles.cardDescription}>
                                    {description}
                                </p>

                                <span className={styles.cardRead}>
                                    <FormattedMessage
                                        id="homePage.article.read"
                                        defaultMessage="Читать"
                                    />
                                </span>
                            </div>

                            <img className={styles.cardImage} src={imageUrl} />
                        </Link>
                    </section>

                    <section className={styles.articles}>
                        <h2 className={styles.articlesTitle}>
                            <FormattedMessage
                                id="homePage.articles.title"
                                defaultMessage="Статьи"
                            />
                        </h2>

                        {articles.length > 0 && (
                            <p className={styles.articlesDescription}>
                                <FormattedMessage
                                    id="homePage.articles.description"
                                    defaultMessage="Всего {count, plural, one {# статья} few {# статьи} many {# статей} other {# статьи}}"
                                    values={{
                                        count: articles.length,
                                    }}
                                />
                            </p>
                        )}

                        <div className={styles.articlesList}>
                            {articles.map(
                                (
                                    {
                                        title,
                                        description,
                                        imageUrl,
                                        articleLink,
                                    },
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

                                            <p
                                                className={
                                                    styles.cardDescription
                                                }
                                            >
                                                {description}
                                            </p>

                                            <span className={styles.cardRead}>
                                                <FormattedMessage
                                                    id="homePage.article.read"
                                                    defaultMessage="Читать"
                                                />
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
        </TranslationsProvider>
    );
};
