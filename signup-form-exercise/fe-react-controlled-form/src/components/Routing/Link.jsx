import React from "react";

const Link = ({ to, text }) => {
    const preventReload = (event) => {
        event.preventDefault();
        window.history.pushState({}, "", to);
        const navigationEvent = new PopStateEvent("navigate");
        window.dispatchEvent(navigationEvent);
    };

    return (
        <a href={to} onClick={preventReload}>
            {text}
        </a>
    );
}

export default Link;