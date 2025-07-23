import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
    handler: (event: MouseEvent) => void
) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("pointerdown", listener);

        return () => {
            document.removeEventListener("pointerdown", listener);
        };
    }, [ref, handler]);

    return ref;
};
