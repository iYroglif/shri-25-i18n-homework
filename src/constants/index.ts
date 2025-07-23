import type { Lang, Locale } from "@/types";

export { BRAND_NAMES } from "./brand-names";
export { LANG_COOKIE_NAME } from "./lang-cookie-name";
export { LANG_DIRECTION } from "./lang-direction";

export const SUPPORTED_LANGS = ["ru", "en", "ar"] as const;

export const SUPPORTED_LOCALES = [
    "ru",
    "ru-RU",
    "ru-BY",
    "ru-KZ",
    "en",
    "ar",
] as const;

export const DEFAULT_LOCALE: Locale = "en";
export const DEFAULT_LANG: Lang = "en";

export const CONFERENCE_DATE = "2025-08-15";
