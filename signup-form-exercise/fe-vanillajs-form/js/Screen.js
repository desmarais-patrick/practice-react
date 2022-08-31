(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.Screen = function Screen(name, rootNode, initializer) {
        var screenName = name;
        var screenRootNode = rootNode;
        var originalDisplayValue = rootNode.style.display;

        function show() {
            if (originalDisplayValue !== 'none') {
                rootNode.style.display = originalDisplayValue;
            } else {
                rootNode.style.display = 'block';
            }
        }
        function hide() {
            rootNode.style.display = 'none';
        }

        let initialized = false;
        function init(options) {
            if (initialized) {
                throw new Error(`${screenName} already initialized!`);
            }
            initializer(screenRootNode, options);
            initialized = true;
        }

        return {
            name,
            show,
            hide,
            init,
        }
    };
})(window);
