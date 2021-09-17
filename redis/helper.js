"use strict";

const { SOCKET_CONVERSATIONS } = require("../common/constants");
const redisClient = require("../database");

exports.getConversations = (roomName, callback) => {
    redisClient.get(SOCKET_CONVERSATIONS + roomName, (err, reply) => {
        if (err) {
            return callback(err);
        }

        return callback(null, reply || []);
    })
}