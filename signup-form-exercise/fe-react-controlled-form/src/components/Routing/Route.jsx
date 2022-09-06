import { useEffect, useState } from "react";

const Route = ({ path, pageComponent, pageProps }) => {
    let initialPath = "/";
    if (typeof window !== "undefined") {
        initialPath = window.location.pathname;
    }
    const [currentPath, setCurrentPath] = useState(initialPath);
    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("navigate", onLocationChange);

        return () => {
            window.removeEventListener("navigate", onLocationChange);
        };
    }, []);

    pageProps.isDisplayed = (currentPath === path);
    return  pageComponent(pageProps);
};

export default Route;