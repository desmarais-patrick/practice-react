import React from "react";

import UserBadge from "../components/UserBadge.jsx";
import Link from "../components/Routing/Link.jsx";

const Home = (props) => {
    if (props.isDisplayed === false) return null;
    return (
        <>
            <h1>Home</h1>
            {props.user && <UserBadge user={props.user} />}
            {!props.user && <Link to="/SignUp" text="Sign up" />}
        </>
    );
};

export default Home;