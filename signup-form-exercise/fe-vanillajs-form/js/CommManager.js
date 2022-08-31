(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.CommManager = function CommManager(
        targetAddress, signUpRoute, isDebugEnabled) {

        function signUp(body, thenCallback, catchCallback) {
            const destination = targetAddress + signUpRoute;
            const serializedBody = JSON.stringify(body);
            const fetchPromise = fetch(destination, {
                method: "POST",
                body: serializedBody,
                mode: "no-cors",
            });

            fetchPromise.then(value => {
                isDebugEnabled && console.log("Sign Up response:", "OK?", value.ok, "; status", value.status, "; body:", value.body);
                thenCallback(body, value);
            });
            fetchPromise.catch(error => {
                isDebugEnabled && console.log("Sign Up error:", value.status, value.body, error);
                catchCallback(error);
            });
        }

        return {
            signUp,
        };
    };
})(window);
