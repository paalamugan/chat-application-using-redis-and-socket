"use strict";

const apiRouter = require('./api');

const healthCheckController = (req, res, next) => {
    res.send('Ok');
}

module.exports = (app) => {
    app.get('/health-check', healthCheckController);
    app.use('/api', apiRouter);
}