import { type FC } from "react";
import { FormattedMessage } from "react-intl";

import { Layout } from "@/components";
import { TranslationsProvider } from "@/providers";
import type { Lang } from "@/types";

import styles from "./styles.module.css";

const getTranslations = (lang: Lang) => import(`./lang/${lang}.json`);

export const ArticleUiBy: FC = () => (
    <TranslationsProvider getTranslations={getTranslations}>
        <Layout>
            <main className={styles.article}>
                <h1>
                    <FormattedMessage
                        id="articleUiBy.title"
                        defaultMessage="Двухъязычный интерфейс: как учесть русский и белорусский языки в одном продукте"
                    />
                </h1>

                <p>
                    <FormattedMessage
                        id="articleUiBy.text"
                        defaultMessage="Создание интерфейса для Беларуси — это вызов двуязычия. Продукт должен быть понятен и русскоязычным, и белорусскоязычным пользователям. Мы рассматриваем, как организовать структуру переводов, какие существуют UX-решения для переключения языка и почему важно уделять внимание аутентичности белорусского контента."
                    />
                </p>
            </main>
        </Layout>
    </TranslationsProvider>
);
