import { useParams } from "react-router-dom";

import { DEFAULT_LOCALE } from "@/constants";

export const useLocale = () => {
    const { locale = DEFAULT_LOCALE } = useParams();

    return locale;
};
