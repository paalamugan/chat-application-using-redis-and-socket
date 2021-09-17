"use strict";

const express = require('express');
const { getConversations } = require('../controllers/conversation-controller');
const Router = express.Router();
const loginController = require('../controllers/login-controller');

Router
    .post('/login', loginController)
    .get('/conversations', getConversations)

module.exports = Router;