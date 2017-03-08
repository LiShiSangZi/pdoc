'use strict';

const express = require('express');

const app = express();
const http = require('http');
const path = require('path');
const config = require('../config/server.json');

const Logger = require('./logger');
console.log(path.join(__dirname, '_book'));
app.use('/help', express.static(path.join(__dirname, '../_book')));

Logger(app);



/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.port);
console.log(`Start on port ${config.port}`);
