import { useQuery } from "@tanstack/react-query";
import { type FC, type PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { useParams } from "react-router-dom";

import { Loader } from "@/components";
import { DEFAULT_LANG, DEFAULT_LOCALE, SUPPORTED_LANGS } from "@/constants";
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
    const { locale = DEFAULT_LOCALE } = useParams();

    const lang = locale.split("-")[0] as Lang;
    const translationsLang: Lang = !SUPPORTED_LANGS.includes(lang)
        ? DEFAULT_LANG
        : lang;

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
