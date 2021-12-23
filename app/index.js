"use strict";

require("dotenv").config();

const express = require("express");
// const socketHandler = require("./lib/handlers/socket-handler");
const { createHttpServer, formatListener } = require("../common/utils");

const app = express();
const server = createHttpServer(app);

// Initialize express
require('../express')(app);

// Initialize database
// require('../database');

// Initialize socket
// require("../socket").initSocket(server, socketHandler);

server.listen(app.get('port'), () => {
    console.log(`Server running on ${formatListener(server)}`);
});

module.exports = server;
