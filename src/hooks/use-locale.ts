import { useParams } from "react-router-dom";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/constants";
import type { Locale } from "@/types";

export const useLocale = (): Locale => {
    const { locale = DEFAULT_LOCALE } = useParams();

    return !SUPPORTED_LOCALES.includes(locale as Locale)
        ? DEFAULT_LOCALE
        : (locale as Locale);
};
