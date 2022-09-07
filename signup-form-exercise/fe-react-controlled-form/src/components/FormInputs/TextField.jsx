import React, { useState } from "react";

const TextField = (props) => {
    const [value, setValue] = useState(props.defaultValue);

    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                type="text"
                required={props.required}
                minLength={props.minLength}
                maxLength={props.maxLength}
                value={value}
                onChange={event => {
                    setValue(event.target.value);
                }}
                onBlur={event => {
                    props.onValueChange(event.target.value);
                }}
            />
        </>
    );
}

export default TextField;