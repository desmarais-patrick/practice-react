(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.SignUpFormScreenInitializer = function SignUpFormScreenInitializer(rootNode,
        {
            app,
            user,
            navManager,
            commManager,
            utilities,
            signUpFormValidator,
            screen,
            formRootNode,
            submitBtnNode,
            formFeedbackNode
        }) {

        let shownFeedbackOnce = false;

        const dobFieldNode = formRootNode.dob;
        dobFieldNode.addEventListener("blur", function (event) {
            const newValue = event.target.value;
            const age = utilities.getAgeFromDateField(newValue);
            const ageText = (age !== null) ? `&#126;${age} years old` : "&nbsp;";
            formRootNode.querySelector("#dobFieldAgeText").innerHTML = ageText;
        });

        formRootNode.addEventListener("submit", onSubmit);
        function onSubmit(event) {
            event.preventDefault();

            app.setState('validating');
            const name = event.target.name.value;
            const isHuman = !!event.target.isHuman.checked;
            const dob = event.target.dob.value;
            const excitement = event.target.excitement.value;
            const city = event.target.city.value;
            const body = {
                name,
                isHuman,
                dob,
                excitement,
                city,
            };

            resetFeedback();
            const validationFeedback = signUpFormValidator.validate(body);
            const [areErrors, errors, areWarnings, warnings, areInfos, infos] = validationFeedback;
            if (areErrors || areWarnings && shownFeedbackOnce == false) {
                areInfos && showValidationFeedback(infos, 'info');
                areWarnings && showValidationFeedback(warnings, 'warning');
                areErrors && showValidationFeedback(errors, 'error');
                shownFeedbackOnce = true;
                app.setState('ready');
                return;
            }

            app.setState('submitting');
            commManager.signUp(body, onSubmitSuccessful, onSubmitError);
        }

        function resetFeedback() {
            const nodes = formRootNode.querySelectorAll(".feedback");
            nodes.forEach(function (itemEl) {
                itemEl.innerText = "";
            });
        }

        function onSubmitSuccessful(body, value) {
            user.setUser(body.name, body.city, body.excitement);
            navManager.navigate('signUpConfirmation');
        }

        function onSubmitError(error) {
            showFormError(error);
            app.setState('ready');
        }

        function showFormError(error) {
            const errorEl = formFeedbackNode;
            errorEl.className = "feedback feedback-error";
            errorEl.innerText = error.toString();
        }

        function showValidationFeedback(validationFeedbackItems, feedbackType) {
            let cssClass;
            switch (feedbackType) {
                case 'error':
                    cssClass = 'feedback-error';
                    break;
                case 'warning':
                    cssClass = 'feedback-warning';
                    break;
                case 'info':
                default:
                    cssClass = 'feedback-info';
                    break;
            }
            Object.entries(validationFeedbackItems).forEach(function ([field, feedback]) {
                const feedbackEl = formRootNode.querySelector(`.feedback.feedback-${field}`);
                feedbackEl.innerText = feedback;
                feedbackEl.className = `feedback feedback-${field} ${cssClass}`;
            });
        }

        app.onAppStateChange(onAppStateChange);
        function onAppStateChange(newState, oldState) {
            if (newState === "loading" || newState === "validating" || newState === "submitting") {
                submitBtnNode.disabled = "disabled";
            } else {
                submitBtnNode.disabled = "";
            }
        }
    };
})(window);
