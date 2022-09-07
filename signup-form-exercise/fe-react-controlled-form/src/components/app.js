import React, { useState } from "react";

import Route from "../components/Routing/Route.jsx";

import HomePage from "../pages/Home.jsx";
import SignUpPage from "../pages/SignUp.jsx";

export default function App(props) {
    const [user, setUser] = useState(null);

    return (
        <div className="container">
            <div className="content-container">
                <Route
                    path="/"
                    pageComponent={HomePage}
                    pageProps={{ user }}
                    defaultAppPath={props.startPage}
                />
                <Route
                    path="/SignUp"
                    pageComponent={SignUpPage}
                    pageProps={{ user, setUser }}
                    defaultAppPath={props.startPage}
                />
            </div>
        </div>
    );
}