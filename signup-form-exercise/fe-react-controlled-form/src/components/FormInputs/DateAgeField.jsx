import React, { useState } from "react";

import { parseDateValues, formatApproxAge } from "../../utilities/AgeUtility";

const DateAgeField = (props) => {
    let defaultValue = "";
    if (props.initialValue) {
        let [year, month, day] = props.initialValue;
        month = month < 10 ? "0" + month : "" + month;
        day = day < 10 ? "0" + day : "" + day;
        defaultValue = `${year}-${month}-${day}`;
    }

    const [value, setValue] = useState(defaultValue);

    const dateValues = parseDateValues(value);
    const approxAgeStr = dateValues === null ? false : formatApproxAge(...dateValues);
    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                type="date"
                value={value}
                onChange={event => {
                    setValue(event.target.value);
                }}
                onBlur={event => {
                    const dateValues = parseDateValues(event.target.value);
                    props.onValueChange(dateValues);
                }} />
            {approxAgeStr && <small>{approxAgeStr}</small>}
        </>
    );
};

export default DateAgeField;