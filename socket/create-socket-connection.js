'use strict';

const async = require('async');
const { convertJsonToString, convertStringToJson } = require('../common/utils');
const { sendConversations } = require('./helper');

module.exports = class CreateSocketConnection {
  constructor(nsp, redisClient, sub, pub, namespace) {
    this.nsp = nsp,
    this.redisClient = redisClient; 
    this.sub = sub;
    this.pub = pub;
    this.namespace = namespace;

    this.sub.on('message', (channel, message) => {
      message = convertStringToJson(message);
      this.nsp.to(channel).emit(message.type, message.payload);
    });
    
    this.sub.on('subscribe', (channel, count) => {});
  }

  join(socket, roomName, callback) {
    async.auto({
      joinSocket: (cb) => {
        socket.join(roomName);
        cb(null)
      }, 
      subscribe: (cb) => {
        this.sub.subscribe(roomName);
        cb(null);
      },
      conversations: (cb) => {
        getConversations(roomName, (err, reply) => {

          if (err) {
            return cb(err);
          }

          sendConversations(roomName, reply);

          cb(null, reply);
        });
      }, 
    }, callback);
  }

  leave(socket, roomName, callback) {
    async.auto({
      leaveSocket: (cb) => {
        socket.leave(roomName);
        cb();
      }
    }, callback);
  }

  broadcast(roomName, message) {
    this.pub.publish(roomName, convertJsonToString(message));
  }

}; 