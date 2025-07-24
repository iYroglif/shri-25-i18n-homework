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
