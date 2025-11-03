import { DEFAULT_LANG, SUPPORTED_LANGS } from "@/constants";
import type { Lang } from "@/types";

import { useLocale } from "./use-locale";

export const useLang = (): Lang => {
    const locale = useLocale();
    const lang = locale.split("-")[0];

    return !SUPPORTED_LANGS.includes(lang as Lang)
        ? DEFAULT_LANG
        : (lang as Lang);
};
