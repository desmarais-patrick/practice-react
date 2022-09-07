import React, { useState } from "react";

import { computeApproxAge } from "../utilities/AgeUtility.js";
import User from "../models/User.js";

import CheckboxField from "./FormInputs/CheckboxField.jsx";
import DateAgeField from "./FormInputs/DateAgeField.jsx";
import PreferredCityField from "./FormInputs/PreferredCityField.jsx";
import TextField from "./FormInputs/TextField.jsx";
import WelcomeSliderField from "./FormInputs/WelcomeSliderField.jsx";

const SignUpForm = (props) => {
    let defaultAge = new Date();
    defaultAge = [
        defaultAge.getFullYear() - 18,
        defaultAge.getMonth() + 1,
        defaultAge.getDate()
    ];

    const [name, setName] = useState({ value: "", feedback: false });
    const [isHuman, setIsHuman] = useState({ checked: false, feedback: false });
    const [dob, setDob] = useState({ value: defaultAge, feedback: false });
    const [excitement, setExcitement] = useState({ value: 0, feedback: false });
    const [city, setCity] = useState({ value: null, feedback: false });
    const [form, setForm] = useState({ status: "ready", feedbackShownOnce: false, feedback: false });

    function onNameValueChange(newValue) {
        setName({
            ...name,
            value: newValue,
        });
    }

    function onIsHumanValueChange(newValue) {
        setIsHuman({
            ...isHuman,
            checked: newValue,
        });
    }

    function onDateValueChange(newValue) {
        setDob({
            ...dob,
            value: newValue,
        });
    }

    function onExcitementValueChange(newValue) {
        setExcitement({
            ...excitement,
            value: newValue,
        });
    }

    function onCityValueChange(newValue) {
        setCity({
            ...city,
            value: newValue,
        });
    }

    function onFormSubmit(event) {
        event.preventDefault();

        setForm({
            ...form,
            status: "validating",
            feedback: false,
        });

        const [areErrors, areWarnings] = validate();
        if (areErrors || areWarnings && form.feedbackShownOnce === false) {
            // Stop here and prevent submission.
            // Let user correct errors (or warnings, once) manually.
            setForm({
                ...form,
                status: "ready",
                feedbackShownOnce: true,
                feedback: "Please review the above information",
            });
        } else {
            setForm({
                ...form,
                status: "submitting",
                feedbackShownOnce: true,
                feedback: false,
            });
            console.log("Submission ready to send to server");
            submit();
        }
    }

    function validate() {
        let areErrors = false,
            areWarnings = false;

        if (typeof name.value !== "string") {
            setName({
                ...name,
                feedback: "❗️ Your name is required to sign up 😊",
            });
            areErrors = true;
        } else {
            const trimmedName = name.value.trim();
            if (trimmedName.length >= 3 && trimmedName.length <= 20) {
                name.feedback && setName({
                    ...name,
                    feedback: false,
                });
            } else {
                setName({
                    ...name,
                    feedback: "❗️ Supported names can be between 2 and 20 letters 😅",
                });
                areErrors = true;
            }
        }

        const approxAge = dob.value && computeApproxAge(...dob.value);
        if (!!approxAge && approxAge > 4 && approxAge < 90) {
            dob.feedback && setDob({
                ...dob,
                feedback: false,
            });
        } else {
            setDob({
                ...dob,
                feedback: `⚠️ Are you really ${approxAge} years old?`,
            });
            areWarnings = true;
        }

        if (typeof city.value === "string" && city.value.length > 0) {
            city.feedback && setCity({
                ...city,
                feedback: false,
            });
        } else {
            setCity({
                ...city,
                feedback: "⚠️ Please can you share your preferred city, so we can personalize your environment?",
            });
            areWarnings = true;
        }

        return [areErrors, areWarnings];
    }

    function submit() {
        const user = new User(name.value, city.value, excitement.value);
        props.commController.signUp(user, onSubmitSuccess, onSubmitFail);
    }

    function onSubmitSuccess(user, value) {
        console.log("Submission successful", value);
        setForm({
            ...form,
            status: "submitted",
            feedback: false,
        });
        props.setUser(user);
        props.onSubmitted();
    }

    function onSubmitFail(error) {
        console.log("Error during submission", error);
        setForm({
            ...form,
            status: "ready",
            feedback: "❗️ An error occurred while submitting the sign up information :S",
        });
    }

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <div className="form-field form-field-text-check">
                <TextField
                    name="name"
                    label="Name: "
                    required={true}
                    minLength={1}
                    maxLength={20}
                    defaultValue=""
                    onValueChange={onNameValueChange}
                />
                {name.feedback && <p className="feedback">{name.feedback}</p>}
                <CheckboxField
                    name="isHuman"
                    label="Human?"
                    defaultChecked={false}
                    onValueChange={onIsHumanValueChange}
                />
                {isHuman.feedback && <p className="feedback">{isHuman.feedback}</p>}
            </div>
            <div className="form-field form-field-date">
                <DateAgeField
                    name="dob"
                    label="Date of birth: "
                    initialValue={defaultAge}
                    onValueChange={onDateValueChange}
                />
                {dob.feedback && <p className="feedback">{dob.feedback}</p>}
            </div>
            <div className="form-field form-field-slider">
                <WelcomeSliderField
                    name="excitement"
                    label="Level of excitement to join this community: "
                    initialValue={0}
                    onValueChange={onExcitementValueChange}
                    entityName={name.value}
                />
                {excitement.feedback && <p className="feedback">{excitement.feedback}</p>}
            </div>
            <div className="form-field form-field-image-selector">
                <PreferredCityField
                    name="city"
                    label="Preferred city: "
                    onValueChange={onCityValueChange}
                />
                {city.feedback && <p className="feedback">{city.feedback}</p>}
            </div>
            <div className="form-field form-field-submit">
                {form.feedback && <p className="feedback">{form.feedback}</p>}
                <button
                    type="submit"
                    disabled={form.status !== "ready"}
                >
                    Submit
                </button>
            </div>
            <p>Summary: {JSON.stringify({
                name,
                isHuman,
                dob,
                excitement,
                city,
                form,
            })}</p>
        </form>
    );
};

export default SignUpForm;