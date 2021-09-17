"use strict";

const socket = require('socket.io');
const redisAdapter = require('socket.io-redis');
const { SOCKTE_DEFAULT_NAMESPACE } = require('../common/constants');
const redisClient = require('../redis');
const CreateSocketConnection = require('./create-socket-connection');
const socketHelper = require('./helper');

const socketInstance = {};

const initSocket = (server, socketHandler, namespace = SOCKTE_DEFAULT_NAMESPACE) => {

  if (!/^\/.*/.test(namespace)) {
    throw new Error('namespace must be start with "/"');
  }

  if (typeof socketHandler !== 'function') {
    throw new Error('SocketHandler must be a function type.');
  }

  const io = socket(server, {
    cors: {
      origin: "*",
      credentials: true
    }
  });

  // Create Redis Connection with socket;
  const pubClient = redisClient.duplicate();
  const subClient = redisClient.duplicate();

  io.adapter(redisAdapter({ pubClient, subClient }));

  const nsp = io.of(namespace);

  socketInstance[namespace] = new CreateSocketConnection(nsp, redisClient, subClient, pubClient, namespace);

  // Socket.io Communication
  nsp.on('connection', socketHandler);

  nsp.adapter.on('error', function(err) {});
  subClient.on('error', function(err) {});
  pubClient.on('error', function (err) {});

  return socketInstance[namespace];

}

const getSocketInstance = (namespace) => {
  namespace = namespace || SOCKTE_DEFAULT_NAMESPACE;
  return socketInstance[namespace] || socketInstance[SOCKTE_DEFAULT_NAMESPACE];
}

module.exports = {
  initSocket,
  getSocketInstance,
  ...socketHelper
}