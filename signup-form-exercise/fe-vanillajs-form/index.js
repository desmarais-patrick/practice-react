(function (window) {
    const AppContext = window.VanillasFormApp

    window.document.addEventListener('readystatechange', function (event) {
        AppContext.globals.isDebugEnabled && console.log(document.readyState);
        if (document.readyState === "complete") {
            init();
        }
    });

    function init() {
        const app = new AppContext.App();
        app.setState('initializing');

        const homeScreen = new AppContext.Screen('home', document.getElementById("homeScreen"), AppContext.HomeScreenInitializer);
        const signUpScreen = new AppContext.Screen('signUp', document.getElementById("signUpScreen"), AppContext.SignUpFormScreenInitializer);
        const signUpConfirmScreen = new AppContext.Screen('signUpConfirmation', document.getElementById("signUpConfirmationScreen"), AppContext.SignUpConfirmScreenInitializer);
        const navManager = new AppContext.NavigationManager(
            app,
            [homeScreen, signUpScreen, signUpConfirmScreen],
            'home'
        );

        const cities = [
            ['vancouver', 'assets/matt-wang-dBp9dbQCh4Q-unsplash.jpg'],
            ['toronto', 'assets/maarten-van-den-heuvel-JlATOM0Jp94-unsplash.jpg'],
            ['montreal', 'assets/jackie-hutchinson-JJYzJXbwB20-unsplash.jpg'],
        ];
        const user = new AppContext.User(cities, cities[0][1]);

        const commManager = new AppContext.CommManager(
            "http://127.0.0.1:8081",
            "/signup",
            AppContext.globals.isDebugEnabled,
        );

        const utilities = new AppContext.Utilities();

        homeScreen.init({
            navManager,
            user,
            userBadgeNode: document.getElementById("userBadge"),
            navigateSignUpButtonNode: document.getElementById("navigateSignUpButton"),
        });

        signUpScreen.init({
            app,
            user,
            navManager,
            commManager,
            utilities,
            signUpFormValidator: new AppContext.SignUpFormValidator(utilities),
            signUpScreen,
            formRootNode: document.getElementById("signUpForm"),
            submitBtnNode: document.getElementById("signUpFormSubmitButton"),
            formFeedbackNode: document.querySelector(".feedback.feedback-signUpForm"),
        });

        signUpConfirmScreen.init({
            navManager,
            user,
            utilities,
            signUpConfirmMessageNode: document.getElementById("signUpConfirmationMessage"),
            homeNavigationButtonNode: document.getElementById("navigateHomeButton"),
        });

        navManager.navigate('home');
    }
})(window);
