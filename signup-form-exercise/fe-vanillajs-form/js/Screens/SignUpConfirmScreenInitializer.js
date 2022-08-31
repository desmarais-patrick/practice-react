(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.SignUpConfirmScreenInitializer = function SignUpConfirmScreenInitializer(rootNode,
        {
            navManager,
            user,
            utilities,
            signUpConfirmMessageNode,
            homeNavigationButtonNode,
        }) {

        homeNavigationButtonNode.addEventListener("click", function () {
            navManager.navigate('home');
        });

        user.onUserChange(function signUpConfirmScreenOnUserChange(user) {
            if (user.name == null) {
                signUpConfirmMessageNode.innerText = "";
                return;
            }
            signUpConfirmMessageNode.innerText =
                utilities.generateWelcomeMessage(user.name, user.excitement);
        });
    };
})(window);
