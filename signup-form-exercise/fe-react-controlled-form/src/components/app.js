import React, { useState } from "react";

import CommunicationController from "../utilities/CommunicationController.js";

import Route from "../components/Routing/Route.jsx";

import HomePage from "../pages/Home.jsx";
import SignUpPage from "../pages/SignUp.jsx";

export default function App(props) {
    const [user, setUser] = useState(false);

    const debugMode = true;
    const commController = new CommunicationController("http://127.0.0.1:8081",
        "/signup",
        debugMode);

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
                    pageProps={{ user, setUser, commController }}
                    defaultAppPath={props.startPage}
                />
            </div>
        </div>
    );
}