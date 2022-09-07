import React, { useState } from "react";

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
    const [formFeedback, setFormFeedback] = useState(false);

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

    return (
        <form className="form">
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
                {formFeedback && <p className="feedback">{formFeedback}</p>}
                <button
                    onClick={props.onSubmitted}
                    type="submit">
                    Submit
                </button>
            </div>
            <p>Summary: {JSON.stringify({
                name,
                isHuman,
                dob,
                excitement,
                city,
                formFeedback,
            })}</p>
        </form>
    );
};

export default SignUpForm;