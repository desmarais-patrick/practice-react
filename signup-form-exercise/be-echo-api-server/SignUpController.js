class SignUpController {
    Submit(urlSearchParams, body, timeoutInMs = 2000) {
        console.log("Received new signup!");

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Signed up:", urlSearchParams, body);
                resolve(["You're signed up!", "text/plain"]);
            }, timeoutInMs);
        });

        return promise;
    }
}

module.exports = SignUpController;