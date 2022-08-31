class ErrorController {
    notFound(urlPathname) {
        return [404, "Not found", `No route configured for ${urlPathname}`];
    }
    unauthorized(urlPathname, method) {
        return [400, "Unauthorized", `No ${method} method configured at ${urlPathname}`];
    }
    internalServerError(urlPathname, method, err) {
        return [500, "Internal server error", `Error occurred processing ${method} at ${urlPathname}. Details: ${err}`];
    }
}

module.exports = ErrorController;