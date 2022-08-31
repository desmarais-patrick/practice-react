(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.NavigationManager = function NavigationManager(
        appInstance, screens, defaultScreen) {

        let currentScreen = defaultScreen;

        function navigate(screenName) {
            appInstance.setState('loading');
            screens.forEach(function (screen) {
                if (screen.name === screenName) {
                    screen.show();
                    currentScreen = screenName;
                } else {
                    screen.hide();
                }
            });
            appInstance.setState('ready');
        }

        return {
            navigate,
        }
    };
})(window);
