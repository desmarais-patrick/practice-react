import React, { useState } from "react";

const CheckboxField = (props) => {
    const [checked, setChecked] = useState(props.defaultChecked);

    return (
        <label>
            <input
                name={props.name}
                type="checkbox"
                checked={checked}
                onChange={event => {
                    setChecked(event.target.checked);
                    props.onValueChange(event.target.checked);
                }} />
            {props.label}
        </label>
    );
}

export default CheckboxField;