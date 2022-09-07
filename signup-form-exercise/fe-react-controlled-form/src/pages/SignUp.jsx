import React, { useState } from "react";

import { generateWelcomeMessage } from "../utilities/WelcomeUtility.js";

import Link from "../components/Routing/Link.jsx";

import SignUpForm from "../components/SignUpForm.jsx";

const SignUp = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (props.isDisplayed === false) return null;
    return (
        <div>
            <h1>Sign up</h1>
            {
                isSubmitted ?
                    <SignUpConfirm
                        user={props.user}
                    /> :
                    <SignUpForm
                        user={props.user}
                        setUser={props.setUser}
                        commController={props.commController}
                        onSubmitted={() => setIsSubmitted(true)} />
            }
        </div>
    );
};

const SignUpConfirm = ({ user }) => {
    const welcomeMessage = generateWelcomeMessage(user.name, user.excitementLevel);
    return (
        <>
            <p>You&apos;re signed up!</p>
            <p>{welcomeMessage}</p>
            <Link to="/" text="Back to home" />
        </>
    );
};

export default SignUp;