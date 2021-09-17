"use strict";

const { SOCKET_ERROR, SOCKET_CONVERSATIONS } = require('../common/constants');
const { convertStringToJson } = require('../common/utils');

const getSocket = (namespace) => {
    const { getSocketInstance } = require('.');
    return getSocketInstance(namespace);
}

const sanitizePayload = (roomName, data, namespace) => {

    if (!roomName) {
        throw new Error('Room Name is missing');
    }

    let socket = getSocket(namespace);

    if (!socket) {
        throw new Error('Please initialize the socket!');
    }

    let payload = convertStringToJson(data);

    return  { socket, payload };
}

const broadcast = (socket, roomName, eventType, payload) => {
    return socket.broadcast(roomName, broadcastFormat(eventType, payload));
}

const broadcastFormat = exports.broadcastFormat = (eventType, payload) => {
    return { type: eventType, payload: payload };
}

const sendToClient = exports.sendToClient = (roomName, data, namespace) => {
    const { socket, payload } = sanitizePayload(roomName, data, namespace);
    return (eventType) => {
        if (!payload) return;
        return broadcast(socket, roomName, eventType, payload);
    }
}

exports.sendError = (roomName, data, namespace) => {
    if (data instanceof Error) {
        data = data.message;
    }
    return sendToClient(roomName, data, namespace)(SOCKET_ERROR);
};

exports.sendConversations = (roomName, data, namespace) => {
    return sendToClient(roomName, data, namespace)(SOCKET_CONVERSATIONS);
};