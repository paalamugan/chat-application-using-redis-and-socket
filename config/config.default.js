"use strict";

// If envirnoment property same with development and production mention that property here.
module.exports = {
    httpSecureCertificate: {
        key: process.env.HTTP_SECURE_KEY || '',
        cert: process.env.HTTP_SECURE_CERT || '',
        ca: process.env.HTTP_SECURE_CA || ''
    }
}