import React, {useState} from "react";

import Link from "../components/Routing/Link.jsx";

const SignUp = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (props.isDisplayed === false) return null;
    return (
        <div>
            <h1>Sign up</h1>
            {
                isSubmitted ?
                <SignUpConfirm /> :
                <SignUpForm onSubmitted={() => setIsSubmitted(true)} />
            }
        </div>
    );
};

const SignUpConfirm = (props) => {
    return (
        <Link to="/" text="Back to home" />
    );
};

const SignUpForm = (props) => {
    return (
        <button onClick={props.onSubmitted}>Submit</button>
    );
};

export default SignUp;