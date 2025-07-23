import { type FC, useEffect } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

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

const ScrollToTop: FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />

                    <Route path="article">
                        <Route path="rtl-icons" element={<ArticleRtlIcons />} />
                        <Route path="css" element={<ArticleCss />} />
                        <Route path="l10n-ru" element={<ArticleL10nRu />} />
                        <Route path="ui-by" element={<ArticleUiBy />} />
                        <Route path="i18n-kz" element={<ArticleI18nKz />} />
                        <Route path="en" element={<ArticleEn />} />
                        <Route path="ar" element={<ArticleAr />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
