import type { SUPPORTED_LANGS, SUPPORTED_LOCALES } from "@/constants";

export type Lang = (typeof SUPPORTED_LANGS)[number];
export type Locale = (typeof SUPPORTED_LOCALES)[number];
