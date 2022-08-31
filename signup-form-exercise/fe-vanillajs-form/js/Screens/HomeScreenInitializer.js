(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.HomeScreenInitializer = function HomeScreenInitializer(rootNode,
        {
            navManager,
            user,
            userBadgeNode,
            navigateSignUpButtonNode,
        }) {

        navigateSignUpButtonNode.addEventListener("click", function () {
            navManager.navigate('signUp');
        });

        user.onUserChange(function (user) {
            if (user.name == null) {
                userBadgeNode.style.visibility = 'hidden';
                return;
            } else {
                userBadgeNode.style.visibility = 'visible';
            }
            userBadgeNode.querySelector('.user-badge-img').src = user.avatarImgSrc;
            userBadgeNode.querySelector('.user-badge-txt').innerText = user.name;
        });
    };
})(window);
