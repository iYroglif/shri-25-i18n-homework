import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { TranslationsProvider } from "@/providers";
import type { Lang } from "@/types";

import styles from "./styles.module.css";

const getTranslations = (lang: Lang) => import(`./lang/${lang}.json`);

export const ArticleCss: FC = () => (
    <TranslationsProvider getTranslations={getTranslations}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleCss.title"
                        defaultMessage="Использование логических CSS-свойств для интернационализированных интерфейсов"
                    />
                </h1>

                <p>
                    <FormattedMessage
                        id="articleCss.intro"
                        defaultMessage="В последние годы всё больше внимания уделяется созданию по-настоящему глобальных веб-продуктов. Особенно это актуально для проектов, чья аудитория распределена по всему миру. При разработке интерфейсов на таких языках, как арабский, где текст и направление верстки идут справа налево (RTL), важно, чтобы визуальное поведение компонентов оставалось интуитивным. Одним из ключевых инструментов для этого являются логические CSS-свойства."
                    />
                </p>

                <p>
                    <FormattedMessage
                        id="articleCss.diff"
                        defaultMessage="В отличие от физических свойств (например, <code>margin-left</code>, <code>padding-right</code>, <code>border-top</code>), логические свойства (<code>margin-inline-start</code>, <code>padding-block-end</code>, <code>border-inline</code>) описывают поведение относительно направления письма, а не фиксированного направления экрана. Это особенно важно в проектах, где контент может быть как на английском, так и на арабском, китайском, русском и других языках с различной направленностью."
                        values={{
                            code: (text) => <code>{text}</code>,
                        }}
                    />
                </p>

                <section className={styles.section}>
                    <h2>
                        <FormattedMessage
                            id="articleCss.whyImportant.title"
                            defaultMessage="Почему это важно для i18n-фронтенда"
                        />
                    </h2>

                    <p>
                        <FormattedMessage
                            id="articleCss.whyImportant.text"
                            defaultMessage="Использование логических свойств делает код более адаптивным и уменьшает потребность в условных стилях или дублировании CSS. Это также упрощает поддержку, особенно в многоязычных продуктах, где переключение между LTR и RTL должно быть максимально бесшовным."
                        />
                    </p>

                    <p>
                        <FormattedMessage
                            id="articleCss.whyImportant.list"
                            defaultMessage="Вот несколько преимуществ, которые дают логические свойства в контексте интернационализации: <ul><li>Универсальность: один набор стилей подходит для всех направлений письма.</li><li>Простота поддержки: меньше кода, меньше ошибок при внесении изменений.</li><li>Гибкость: легко добавлять новые языки, не меняя структуру стилей.</li><li>Последовательность: одинаковое визуальное поведение для всех пользователей, независимо от языка.</li><li>Актуальность: соответствие современным стандартам CSS и лучшим практикам UI-дизайна.</li></ul>"
                            values={{
                                ul: (text) => (
                                    <ul className={styles.list}>{text}</ul>
                                ),
                                li: (text) => <li>{text}</li>,
                            }}
                        />
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>
                        <FormattedMessage
                            id="articleCss.conclusion.title"
                            defaultMessage="Заключение"
                        />
                    </h2>

                    <p>
                        <FormattedMessage
                            id="articleCss.conclusion.text"
                            defaultMessage="Использование логических CSS-свойств — это простой и эффективный способ сделать интерфейсы по-настоящему адаптивными и ориентированными на глобальную аудиторию. Такой подход позволяет учитывать языковые и культурные особенности без необходимости в усложнении кода или дублировании стилей."
                        />
                    </p>
                </section>
            </main>
        </Layout>
    </TranslationsProvider>
);
