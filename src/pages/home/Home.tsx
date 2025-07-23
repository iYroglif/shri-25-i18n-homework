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
    const { title, description, imageUrl, articleLink } =
        getRegionArticleByLocale("ru");

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
