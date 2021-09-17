"use strict";

const consoleError = (errorMessage) => {
    console.error(new Error(errorMessage));
    return errorMessage
}

const defaultConfigValidation = (config) => {
    let error = null;

    return error;
}

const devConfigValidation = (config) => {
    let error = null;

    return error;
}

const prodConfigValidation = (config) => {
    let error = null;

    let { httpSecureCertificate: { key, cert, ca } = {} } = config;

    // if (!key) {
    //     error = consoleError("'HTTP_SECURE_KEY' file path not specified in the envirnoment variable.");
    // }

    // if (!cert) {
    //     error = consoleError("'HTTP_SECURE_CERT' file path not specified in the envirnoment variable.");
    // }
    
    // if (!ca) {
    //     error = consoleError("'HTTP_SECURE_CA' file path not specified in envirnoment variable.");
    // }

    return error;
}

module.exports = (config) => {
    
    let isDefault = defaultConfigValidation(config);
    let isDev = config.isDev && devConfigValidation(config);
    let isProd = config.isProd && prodConfigValidation(config);

    return (isDefault || isDev || isProd) && process.exit(1);
}