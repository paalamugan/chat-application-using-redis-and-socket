"use strict";

const path = require('path');
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const { setSecurityHeaders, loggerApi } = require('../middleware');
const { apiErrorHandler } = require('../error-handler/api-error-handler');
const config = require('../config');

const clientPath = path.join(__dirname, '..', 'public');

module.exports = (app) => {

    app.set('env', config.env);
    app.set('port', config.port);

    app.enable('trust proxy');
    app.disable('x-powered-by');

    // middleware
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(loggerApi);
    app.use(setSecurityHeaders);

//     app.use((req, res, next) => {
//         if (!path.extname(req.path) && !req.path.includes('/api/')) {
//             req.url = '/index.html';
//         }
//         return next();
//     });
    
    app.use(express.static(clientPath));

    app.use(/^(?!\/api).+/, (req, res, next) => {
        res.sendFile(`${clientPath}/index.html`);
    });
    
    // Initialize routes
    require('../routes')(app);

    // Error handlers
    app.use((req, res, next) => {
        return next(createError(404));
    });

    app.use(apiErrorHandler);
}
