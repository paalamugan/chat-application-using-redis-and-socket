'use strict';

exports.apiErrorHandler = (err, req, res, next) => {

    // Delegate to the default error handling mechanisms in Express if the response
    // is already being streamed to the client. 
    if (res.headersSent) {
        return;
    }

    let statusCode = err.status || err.statusCode || res.statusCode;
    let errorMessage = (typeof err === 'string' ? err : err.message) || 'Internal server error';

    statusCode = statusCode > 400 ? statusCode : 400;

    // Log application errors to the console.
    if (err.stack) {
        console.error(err.stack || err.toString());
    }

    if (statusCode === 400) {
        errorMessage = errorMessage || 'Bad Request';
    } else if (statusCode === 401) {
        errorMessage = 'Unauthorized';
    } else if (statusCode === 403) {
        errorMessage = 'Forbidden';
    }

    res.status(statusCode).send({
        code: err.code || err.name || null,
        message: errorMessage
    });
}
