import type { FC, PropsWithChildren } from "react";
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
                    © 2024-2025, ООО «
                    <a className={styles.textLink} href="">
                        {BRAND_NAMES[locale]}
                    </a>
                    ». Все права защищены
                </span>
            </div>
        </>
    );
};
