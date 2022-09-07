function parseDateValues(dateValue) {
    if (typeof dateValue === "string" &&
        /(\d\d\d\d)-(\d\d)-(\d\d)/.test(dateValue)) {

        const matches = dateValue.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
        if (matches !== null && matches.length > 3) {
            return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
        }
    }

    return null;
}
function computeApproxAge(year, month, day) {
    const today = new Date();
    const thisYear = today.getFullYear();
    const chosenYear = year;
    return thisYear - chosenYear;
}
function formatApproxAge(year, month, day) {
    const approxAge = computeApproxAge(year, month, day);
    return `~${approxAge} years old`;
}

export { parseDateValues, computeApproxAge, formatApproxAge }