"use strict";

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const config = require("../config");

exports.setSecurityHeaders  = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
}

exports.setNoCache = (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.header('Surrogate-Control', 'no-store');
    next();
}

exports.loggerApi = (req, res, next) => {
    let logger = morgan('dev');

    if (config.isProd) {
        // const accessLogStream = fs.createWriteStream(path.resolve('.', 'access.log'), { flags: 'a' });
        // app.use(morgan('combined', { stream: accessLogStream }));
        logger = morgan('combined');
    }

    return logger(req, res, next);

}

