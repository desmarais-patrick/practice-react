(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.SignUpFormValidator = function SignUpFormValidator(utilities) {

        function validate(values) {
            let areErrors = false;
            const errors = {};
            let areWarnings = false;
            const warnings = {};
            let areInfos = false;
            const infos = {};

            if (typeof values.name === "string" &&
                values.name.length >= 3 &&
                values.name.length <= 20) {

                // No errors to add.
            } else {
                errors.name = "Your name is required to sign up 😊";
                areErrors = true;
            }

            const approxAge = utilities.getAgeFromDateField(values.dob);
            if (approxAge > 4 && approxAge < 130) {
                // No errors to add.
            } else {
                warnings.dob = `Are you really ${approxAge} years old?`
                areWarnings = true;
            }

            if (typeof values.excitement === "string") {
                const excitement = window.parseInt(values.excitement);
                const excitementFeedback = utilities.generateWelcomeMessage(values.name, excitement);
                if (!excitement) {
                    // No feedback.
                } else {
                    infos.excitement = excitementFeedback;
                    areInfos = true;
                }
            }

            if (typeof values.city === "string" && values.city.length > 0) {
                // No errors to add.
            } else {
                warnings.city = "Please can you share your preferred city, so we can personalize your environment?";
                areWarnings = true;
            }

            return [areErrors, errors, areWarnings, warnings, areInfos, infos];
        }

        return {
            validate,
        };
    };
})(window);
