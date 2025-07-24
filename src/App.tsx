import Cookies from "js-cookie";
import { type FC, useEffect, useLayoutEffect } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
    useParams,
} from "react-router-dom";

import {
    BRAND_NAMES,
    DEFAULT_LANG,
    LANG_COOKIE_NAME,
    LANG_DIRECTION,
    SUPPORTED_LANGS,
    SUPPORTED_LOCALES,
} from "./constants";
import { geoService } from "./lib";
import {
    ArticleAr,
    ArticleCss,
    ArticleEn,
    ArticleI18nKz,
    ArticleL10nRu,
    ArticleRtlIcons,
    ArticleUiBy,
    Home,
} from "./pages";
import type { Lang, Locale } from "./types";

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const LocaleNavigate: FC = () => {
    const { locale = "" } = useParams();

    const lang = locale.split("-")[0];

    const getLang = (): Lang => {
        if (SUPPORTED_LANGS.includes(lang as Lang)) {
            return lang as Lang;
        }

        const cookieLang = Cookies.get(LANG_COOKIE_NAME);
        if (cookieLang && SUPPORTED_LANGS.includes(cookieLang as Lang)) {
            return cookieLang as Lang;
        }

        const browserLang = navigator.languages.find((lang) =>
            SUPPORTED_LANGS.includes(lang as Lang)
        );
        if (browserLang) {
            return browserLang as Lang;
        }

        return DEFAULT_LANG;
    };

    const region = geoService.getCurrentRegion(window.location.search);
    const newLang = getLang();

    useLayoutEffect(() => {
        document.title = BRAND_NAMES[newLang];
        document.documentElement.lang = newLang;
        document.documentElement.dir = LANG_DIRECTION[newLang];
    }, [newLang]);

    const getLocale = (): Locale => {
        const newLocale = [newLang, region].filter(Boolean).join("-");
        if (SUPPORTED_LOCALES.includes(newLocale as Locale)) {
            return newLocale as Locale;
        }

        return newLang;
    };

    const { pathname, search, hash } = useLocation();

    const newLocale = getLocale();
    if (newLocale !== locale) {
        return (
            <Navigate
                to={{
                    pathname: pathname.replace(locale, newLocale),
                    search,
                    hash,
                }}
                replace
            />
        );
    }

    return <Outlet />;
};

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<LocaleNavigate />}>
                    <Route path=":locale">
                        <Route index element={<Home />} />

                        <Route path="article">
                            <Route
                                path="rtl-icons"
                                element={<ArticleRtlIcons />}
                            />
                            <Route path="css" element={<ArticleCss />} />
                            <Route path="l10n-ru" element={<ArticleL10nRu />} />
                            <Route path="ui-by" element={<ArticleUiBy />} />
                            <Route path="i18n-kz" element={<ArticleI18nKz />} />
                            <Route path="en" element={<ArticleEn />} />
                            <Route path="ar" element={<ArticleAr />} />
                        </Route>

                        <Route
                            path="*"
                            element={<Navigate to="/:locale" replace />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
