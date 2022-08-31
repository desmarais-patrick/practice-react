(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.User = function User(avatarImages, defaultAvatar) {

        let userName = null;
        let userAvatarImgSrc = null;
        let userExcitement = 0;

        function setUser(name, city, excitement) {
            userName = name;

            let cityImgSrc;
            const matchingAvatar = avatarImages.find(function ([avatarCity, src]) {
                return avatarCity === city;
            });
            if (matchingAvatar != null) {
                cityImgSrc = matchingAvatar[1];
            } else {
                cityImgSrc = defaultAvatar;
            }
            userAvatarImgSrc = cityImgSrc;

            userExcitement = parseInt(excitement);

            notifyUserChange();
        }

        function getUser() {
            return {
                name: userName,
                avatarImgSrc: userAvatarImgSrc,
                excitement: userExcitement,
            };
        }

        const userChangeCallbacks = [];
        function onUserChange(callback) {
            userChangeCallbacks.push(callback);
        }

        function notifyUserChange() {
            userChangeCallbacks.forEach(function (cb) {
                setTimeout(function () {
                    cb(getUser());
                }, 0);
            });
        }

        return {
            setUser,
            getUser,
            onUserChange,
        }
    };
})(window);
