"use strict";

const path = require('path');
const configErrorHandler = require('../error-handler/config-error-handler');
const defaultConfig = require('./config.default');

const env = (process.env.NODE_ENV || 'development').toLowerCase().trim();
const envConfig = require(path.resolve(__dirname, `config.${env}`));

const config = Object.assign({}, defaultConfig, envConfig);

config.env = env;
config.isProd = (env === 'production');
config.isDev = (env === 'development');

// Validate configurations
configErrorHandler(config);

module.exports = config;