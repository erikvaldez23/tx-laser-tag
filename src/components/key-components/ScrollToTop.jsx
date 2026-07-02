import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_OFFSET_PADDING = 24; // breathing room below the fixed topbar

export default function ScrollToTop() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }
        const id = hash.replace("#", "");
        const scrollToHash = () => {
            const el = document.getElementById(id);
            if (!el) return;
            const header = document.querySelector(".MuiAppBar-root");
            const headerHeight = header ? header.getBoundingClientRect().height : 0;
            const top =
                el.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                SCROLL_OFFSET_PADDING;
            window.scrollTo({ top, behavior: "smooth" });
        };
        const timer = setTimeout(scrollToHash, 100);
        return () => clearTimeout(timer);
    }, [pathname, hash, key]);

    return null;
}
