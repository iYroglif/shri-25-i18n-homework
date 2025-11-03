import { DEFAULT_LANG, SUPPORTED_LANGS } from "@/constants";
import type { Lang } from "@/types";

export const getSupportedLang = (locale: string): Lang => {
    const lang = locale.split("-")[0];

    return !SUPPORTED_LANGS.includes(lang as Lang)
        ? DEFAULT_LANG
        : (lang as Lang);
};
