const http = require('http');
const { URL } = require('url');
const Router = require('./Router');
const SignUpController = require('./SignUpController');
const ErrorController = require('./ErrorController');

const hostname = '127.0.0.1';
const port = 8081;

const signUpController = new SignUpController();
const errorController = new ErrorController();

const router = new Router();
router.addRoute('/signup', 'POST', signUpController.Submit.bind(signUpController));

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}/`);

    let body = "";
    req.on('data', (chunk) => body += chunk);
    req.on('error', (err) => {
        const [errorCode, message] = errorController.internalServerError(url.pathname, req.method, err.ToString());
        res.statusCode = errorCode;
        res.setHeader('Content-Type', 'text/plain');
        res.end(message);
    });
    req.on('end', () => {
        let statusCode, contentType, message;
        contentType = 'text/plain';
        try {
            const routePromise = router.route(url.pathname, req.method, url.searchParams, body);
            routePromise.then((value) => {
                [statusCode, contentType, message] = value;
                res.statusCode = statusCode;
                res.setHeader('Content-Type', contentType);
                res.end(message);
            });
            routePromise.catch(error => {
                [statusCode, message] = errorController.internalServerError(url.pathname, req.method, err.ToString());
                res.statusCode = statusCode;
                res.setHeader('Content-Type', contentType);
                res.end(message);
            });
        } catch (err) {
            let details = "";
            const errMessage = err.message;
            if (errMessage.indexOf("Route not found") > -1) {
                [statusCode, message, details] = errorController.notFound(url.pathname);
            }
            else if (errMessage.indexOf("Method not found") > -1) {
                [statusCode, message, details] = errorController.unauthorized(url.pathname, req.method);
            }
            else {
                [statusCode, message, details] = errorController.internalServerError(url.pathname, req.method, errMessage);
            }
            res.statusCode = statusCode;
            res.setHeader('Content-Type', contentType);
            res.end(message + "\n\n" + details);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});