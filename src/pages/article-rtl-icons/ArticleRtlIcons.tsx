import cn from "classnames";
import { type FC } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

import { Layout } from "@/components";
import { DEFAULT_LOCALE, LANG_DIRECTION } from "@/constants";
import {
    ClockIcon,
    GamepadIcon,
    MagnifierIcon,
    MessageIcon,
    PaperNoteIcon,
    WindowIcon,
} from "@/icons";
import { TranslationsProvider } from "@/providers";
import type { Lang } from "@/types";

import styles from "./styles.module.css";

const getTranslations = (lang: Lang) => import(`./lang/${lang}.json`);

export const ArticleRtlIcons: FC = () => {
    const { locale = DEFAULT_LOCALE } = useParams();

    const lang = locale.split("-")[0] as Lang;
    const isRtl = LANG_DIRECTION[lang] === "rtl";

    return (
        <TranslationsProvider getTranslations={getTranslations}>
            <Layout>
                <main className={styles.article}>
                    <h1>
                        <FormattedMessage
                            id="articleRtlIcons.title"
                            defaultMessage="Какие иконки нужно разворачивать для RTL, {br} а какие — нет?"
                            values={{ br: <br /> }}
                        />
                    </h1>

                    <p>
                        <FormattedMessage
                            id="articleRtlIcons.intro"
                            defaultMessage="При адаптации интерфейсов под языки с письмом справа налево (RTL) важно учитывать не только верстку и тексты, но и визуальные элементы. Многие иконки требуют зеркального отражения, а другие должны оставаться в оригинальном виде. Неправильное отображение может сделать интерфейс менее интуитивным и запутать пользователя."
                        />
                    </p>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.whyImportant.title"
                                defaultMessage="Почему важно разворачивать иконки в RTL?"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.whyImportant.text"
                                defaultMessage="В RTL-интерфейсах меняется не только направление текста, но и логика взаимодействия. Иконки с явной направленностью должны отражать это изменение, чтобы сохранить естественный поток восприятия и соответствовать ожиданиям пользователя."
                            />
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.flipIcons.title"
                                defaultMessage="Иконки, которые нужно разворачивать"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.flipIcons.text"
                                defaultMessage="Разворачивайте иконки, которые имеют явное направление или асимметричную форму (за исключением примеров, которые мы рассмотрим позже в статье). Например, иконка заметок с явным направлением текста, асимметричная иконка пользовательского интерфейса окна приложения или иконка сообщения. Примеры таких иконок:"
                            />
                        </p>

                        <div
                            className={cn(styles.icons, {
                                [styles.rtl]: isRtl,
                            })}
                            data-testid="rtl-icons"
                        >
                            <PaperNoteIcon />
                            <MessageIcon />
                            <WindowIcon />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.dontFlipIcons.title"
                                defaultMessage="Иконки, которые не нужно разворачивать"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.dontFlipIcons.text"
                                defaultMessage="Можно не разворачивать симметричные иконки. Иконки, которые являются логотипом или представляют бренд тоже не следует зеркалить — они должны оставаться узнаваемыми. Особое внимание уделите элементам, которые подчиняются «правилу правой руки» — если иконка интуитивно ассоциируется с действием правой руки (как держание предмета), её ориентация должна сохраняться независимо от направления письма. Примеры таких иконок:"
                            />
                        </p>

                        <div
                            className={styles.icons}
                            data-testid="not-rtl-icons"
                        >
                            <GamepadIcon />
                            <MagnifierIcon />
                            <ClockIcon />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleRtlIcons.conclusion.title"
                                defaultMessage="Заключение"
                            />
                        </h2>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.conclusion.text1"
                                defaultMessage="Грамотная работа с иконками в RTL-интерфейсах — важная часть локализации. Это не просто техническая деталь, а способ сделать интерфейс по-настоящему удобным для пользователей с разными культурными особенностями."
                            />
                        </p>

                        <p>
                            <FormattedMessage
                                id="articleRtlIcons.conclusion.text2"
                                defaultMessage="<strong>Рекомендация:</strong> Разработайте внутренние стандарты для дизайнеров и разработчиков, чтобы обеспечить единый подход к работе с иконками во всех локализациях продукта."
                                values={{
                                    strong: (chunks) => (
                                        <strong>{chunks}</strong>
                                    ),
                                }}
                            />
                        </p>
                    </section>
                </main>
            </Layout>
        </TranslationsProvider>
    );
};
