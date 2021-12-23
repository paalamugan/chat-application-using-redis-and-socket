"use strict";

const express = require('express');
const { getConversations } = require('../controllers/conversation-controller');
const Router = express.Router();
const loginController = require('../controllers/login-controller');

const healthCheckController = (req, res, next) => {
    res.send('Ok');
}

Router
    .get('/health-check', healthCheckController)
    .post('/login', loginController)
    .get('/conversations', getConversations)

module.exports = Router;