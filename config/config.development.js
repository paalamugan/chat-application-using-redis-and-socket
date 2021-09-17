"use strict";

module.exports = {
    port: process.env.PORT || 8080,
    redis: {
        host: process.env.REDIS_HOST || '0.0.0.0',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || 'test',
    }
}