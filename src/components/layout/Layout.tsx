import type { FC, PropsWithChildren } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { BRAND_NAMES } from "@/constants";
import { useLocale } from "@/hooks";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";

import { LangSelect } from "../lang-select";
import styles from "./styles.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const locale = useLocale();

    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <Link className={styles.headerBrand} to="/">
                        <BrandLogoIcon />

                        <span className={styles.headerBrandText}>
                            {BRAND_NAMES[locale]}
                        </span>
                    </Link>

                    <LangSelect />
                </div>
            </div>

            <div className={styles.contentContainer}>{children}</div>

            <div className={styles.footer}>
                <div
                    className={styles.footerSocialLinks}
                    data-testid="social-icons"
                >
                    {[TelegramIcon, VkontakteIcon].map((Icon, index) => (
                        <a key={index} href="">
                            <Icon />
                        </a>
                    ))}
                </div>

                <span className={styles.footerText}>
                    <FormattedMessage
                        id="layout.footer.copyright"
                        defaultMessage="© {yearStart}-{yearEnd}, ООО «<link>{brand}</link>». Все права защищены"
                        values={{
                            yearStart: (
                                <FormattedDate
                                    value={new Date(2024, 1)}
                                    year="numeric"
                                    numberingSystem="latn"
                                />
                            ),
                            yearEnd: (
                                <FormattedDate
                                    value={new Date(2025, 1)}
                                    year="numeric"
                                    numberingSystem="latn"
                                />
                            ),
                            brand: BRAND_NAMES[locale],
                            link: (text) => (
                                <a className={styles.textLink} href="">
                                    {text}
                                </a>
                            ),
                        }}
                    />
                </span>
            </div>
        </>
    );
};
