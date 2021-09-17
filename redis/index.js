"use strict";

const redis = require('redis');
const config = require('../config');

const options = {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
};

const redisClient = redis.createClient(options);

redisClient.on("connect", () => { 
    console.log("Redis database connected");
});

redisClient.on('error', (err) => {
    console.error('There was an error with the redis client ' + err);
});

module.exports = redisClient;