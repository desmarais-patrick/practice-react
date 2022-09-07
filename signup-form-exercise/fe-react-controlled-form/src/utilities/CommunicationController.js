function CommunicationController(targetAddress, signUpRoute, isDebugEnabled) {

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
            isDebugEnabled && console.log("Sign Up error:", error);
            catchCallback(error);
        });
    }

    return {
        signUp,
    };
}

export default CommunicationController;