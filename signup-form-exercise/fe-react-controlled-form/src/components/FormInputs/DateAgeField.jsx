import React, { useState } from "react";

const DateAgeField = (props) => {
    let defaultValue = "";
    if (props.initialValue) {
        let [year, month, day] = props.initialValue;
        month = month < 10 ? "0" + month : "" + month;
        day = day < 10 ? "0" + day : "" + day;
        defaultValue = `${year}-${month}-${day}`;
    }

    const [state, setState] = useState({
        value: defaultValue,
    });

    function parseValues(dateValue) {
        if (typeof dateValue === "string" &&
            /(\d\d\d\d)-(\d\d)-(\d\d)/.test(dateValue)) {

            const matches = dateValue.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
            if (matches !== null && matches.length > 3) {
                return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
            }
        }

        return null;
    }
    function computeApproxAge(dateValue) {
        const dateValues = parseValues(dateValue);
        if (dateValues === null) return null;

        const today = new Date();
        const thisYear = today.getFullYear();
        const chosenYear = dateValues[0];
        const approxAge = thisYear - chosenYear;
        return `~${approxAge} years old`;
    }
    const approxAgeStr = computeApproxAge(state.value);

    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                id={props.name}
                name={props.name}
                type="date"
                value={state.value}
                onChange={event => {
                    setState({
                        ...state,
                        value: event.target.value,
                    })
                }}
                onBlur={event => {
                    props.onValueChange(parseValues(event.target.value));
                }} />
            {approxAgeStr && <small>{approxAgeStr}</small>}
        </>
    );
};

export default DateAgeField;