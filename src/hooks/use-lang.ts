import { getSupportedLang } from "@/lib";

import { useLocale } from "./use-locale";

export const useLang = () => {
    const locale = useLocale();

    return getSupportedLang(locale);
};
