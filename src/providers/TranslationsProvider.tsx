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
