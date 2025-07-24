import { type FC, useCallback, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { DEFAULT_LOCALE, SUPPORTED_LANGS } from "@/constants";
import { DoneIcon, EarthIcon } from "@/icons";
import type { Lang } from "@/types";

import { useClickOutside } from "./hooks";
import styles from "./styles.module.css";

const LANG_LABEL: Record<Lang, string> = {
    ru: "Русский",
    en: "English",
    ar: "اَلْعَرَبِيَّةُ",
};

export const LangSelect: FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    const { locale = DEFAULT_LOCALE } = useParams();
    const { pathname, search, hash } = useLocation();

    const handleMenuClose = useCallback(() => {
        setShowMenu(false);
    }, []);

    const handleMenuToggle = useCallback(() => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    }, []);

    const langSelectRef = useClickOutside<HTMLDivElement>(handleMenuClose);

    const selectedLang = locale.split("-")[0] as Lang;

    return (
        <div className={styles.langSelect} ref={langSelectRef}>
            <button
                className={styles.langSelectButton}
                onClick={handleMenuToggle}
                data-testid="lang-select-button"
            >
                <span className={styles.langSelectText}>
                    {LANG_LABEL[selectedLang]}
                </span>

                <EarthIcon />
            </button>

            {showMenu && (
                <ul
                    className={styles.langSelectMenu}
                    data-testid="lang-select-menu"
                >
                    {SUPPORTED_LANGS.map((lang) => {
                        const langName = LANG_LABEL[lang];

                        return (
                            <Link
                                key={lang}
                                to={{
                                    pathname: pathname.replace(
                                        selectedLang,
                                        lang
                                    ),
                                    search,
                                    hash,
                                }}
                            >
                                <li
                                    className={styles.langSelectMenuItem}
                                    key={lang}
                                    onClick={handleMenuClose}
                                >
                                    <span
                                        className={
                                            styles.langSelectMenuItemText
                                        }
                                    >
                                        {langName}
                                    </span>

                                    {lang === selectedLang && <DoneIcon />}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
