import React, { useState } from "react";

import { generateWelcomeMessage } from "../../utilities/WelcomeUtility";

const WelcomeSliderField = (props) => {
    const [value, setValue] = useState(props.initialValue);
    const welcomeMessage = value < 1 ? false : generateWelcomeMessage(props.entityName, value);

    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                type="range"
                min="0"
                max="10"
                step="1"
                value={value}
                onChange={event => {
                    setValue(event.target.value);
                }}
                onBlur={event => {
                    props.onValueChange(event.target.value);
                }} />
            {welcomeMessage && <small>{welcomeMessage}</small>}
        </>
    );
};

export default WelcomeSliderField;