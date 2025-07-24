import { type FC } from "react";
import { FormattedDate, FormattedMessage, FormattedNumber } from "react-intl";

import { Layout } from "@/components";
import { TranslationsProvider } from "@/providers";
import type { Lang } from "@/types";

import styles from "./styles.module.css";

const getTranslations = (lang: Lang) => import(`./lang/${lang}.json`);

export const ArticleL10nRu: FC = () => (
    <TranslationsProvider getTranslations={getTranslations}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleL10nRu.title"
                        defaultMessage="Как адаптировать веб-приложение под российских пользователей: нюансы локализации"
                    />
                </h1>

                <p>
                    <FormattedMessage
                        id="articleL10nRu.text1"
                        defaultMessage="Российская аудитория — одна из крупнейших в Восточной Европе, с более чем {usersCount} интернет-пользователей. При этом около {percent} предпочитают сайты на русском языке. При локализации важно учитывать форматы чисел (например, десятичный разделитель — запятая), валют и дат."
                        values={{
                            usersCount: <FormattedNumber value={98_000_000} />,
                            percent: (
                                <FormattedNumber value={0.78} style="percent" />
                            ),
                        }}
                    />
                </p>

                <p>
                    <FormattedMessage
                        id="articleL10nRu.text2"
                        defaultMessage="Также стоит обращать внимание на юридические аспекты: закон о персональных данных требует хранения информации на серверах внутри страны. Многие компании перешли на соответствие этому требованию ещё с {date}"
                        values={{
                            date: (
                                <FormattedDate
                                    value={new Date("2015-09-01")}
                                    year="numeric"
                                    month="long"
                                    day="numeric"
                                    numberingSystem="latn"
                                />
                            ),
                        }}
                    />
                </p>
            </main>
        </Layout>
    </TranslationsProvider>
);
