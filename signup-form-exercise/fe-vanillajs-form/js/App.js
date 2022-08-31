(function (window) {
    const AppContext = window.VanillasFormApp;

    AppContext.App = function App() {
        var states = {
            initializing: 'initializing',
            ready: 'ready',
            loading: 'loading',
            validating: 'validating',
            submitting: 'submitting'
        };
        var state = states.ready;

        var appStateChangeCallbacks = [];
        var onAppStateChange = function (callback) {
            appStateChangeCallbacks.push(callback);
        };

        var setState = function (newValue) {
            var oldValue = state;
            state = states[newValue];
            appStateChangeCallbacks.forEach(function (cb) {
                setTimeout(function () {
                    cb(state, oldValue);
                }, 0);
            });
        };

        return {
            state,
            onAppStateChange,
            setState,
        }
    };
})(window);
