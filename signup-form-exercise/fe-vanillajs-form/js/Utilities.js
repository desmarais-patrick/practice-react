(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.Utilities = function Utilities() {

        function generateWelcomeMessage(name = "", excitement = 0) {
            if (excitement === 0) {
                return "";
            }
            if (excitement <= 2) {
                return "Welcome!";
            }
            if (excitement <= 6) {
                return `Welcome ${name}! 😉`;
            }
            if (excitement <= 9) {
                return `Welcome ${name}! 🤩`;
            }
            return `Welcome ${name}! 🥳`;
        }

        function getAgeFromDateField(dateValue) {
            if (typeof dateValue === "string" &&
                /(\d\d\d\d)-(\d\d)-(\d\d)/.test(dateValue)) {

                const matches = dateValue.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
                if (matches !== null && matches.length > 3) {
                    const today = new window.Date();
                    const thisYear = today.getFullYear();
                    const chosenYear = parseInt(matches[1]);
                    return thisYear - chosenYear;
                }
            }

            return null;
        }

        return {
            generateWelcomeMessage,
            getAgeFromDateField,
        };
    };
})(window);
