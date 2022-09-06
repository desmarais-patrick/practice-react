import React, { useState } from "react";

import Route from "../components/Routing/Route.jsx";

import HomePage from "../pages/Home.jsx";
import SignUpPage from "../pages/SignUp.jsx";

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <>
            <Route path="/" pageComponent={HomePage} pageProps={{user}} />
            <Route path="/SignUp" pageComponent={SignUpPage} pageProps={{user}} />
        </>
    );
}