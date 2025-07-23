import type { FC } from "react";

import styles from "./styles.module.css";

export const Loader: FC = () => (
    <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
    </div>
);
