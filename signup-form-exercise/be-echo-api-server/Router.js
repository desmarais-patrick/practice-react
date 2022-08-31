class Router {
    routes = {};

    addRoute(route, method, callback) {
        this.routes[route] = {
            ...this.routes[route],
            [method]: callback,
        };
    }

    route(urlPathname, method, urlSearchParams, body) {
        const route = this.routes[urlPathname];
        if (!route) {
            throw new Error("Route not found");
        }
        const callback = route[method];
        if (!callback) {
            throw new Error("Method not bound");
        }

        const promise = new Promise((resolve, reject) => {
            const callbackPromise = callback(urlSearchParams, body);
            callbackPromise.then(([responseMessage, contentType]) => {
                resolve([200, contentType, responseMessage]);
            });
            callbackPromise.catch((error) => {
                reject(error);
            });
        });

        return promise;
    }
}

module.exports = Router;