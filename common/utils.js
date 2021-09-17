"use strict";

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('../config');

/**
 * Convert string to json
 * @param {*} string
 */
exports.convertStringToJson = (string) => {
    
    if (typeof string !== 'string') {
        return string;
    }

    try {
        string = JSON.parse(string);
    } catch (err) {
        // console.error("JSON PARSE ERROR: ", err.message);
    }
    return string;
}

/**
 * Convert json to string
 * @param {*} data
 */
 exports.convertJsonToString = (data) => {
    
    if (!data || typeof data === 'string') {
        return data;
    }

    try {
        data = JSON.stringify(data);
    } catch (err) {
        // console.error("JSON PARSE ERROR: ", err.message);
    }
    return data;
}

/**
 * Creates a new http or https server.
 * @param {*} app 
 */
 exports.createHttpServer = (app) => {
    // This function detects whether it should create an http or https server and loads keyfiles as necessary.
    let options = {};
    let server = config.isProd ? http : http;

    let keyFile = config?.httpSecureCertificate?.key;
    let certFile = config?.httpSecureCertificate?.cert;
    let chainFile = config?.httpSecureCertificate?.ca;

    if (keyFile && certFile) {
        options.key = fs.readFileSync(path.resolve(keyFile)),
        options.cert = fs.readFileSync(path.resolve(certFile))
    };

    if (chainFile) {
        options.ca = fs.readFileSync(path.resolve(chainFile))
    }

    return server.createServer(options, app);
}

exports.formatListener = (listener) => {
    const address = listener.address();
    if (address.family === 'IPv6') {
        return '[' + address.address + "]:" + address.port;
    }
    return address.address + ":" + address.port;
}
