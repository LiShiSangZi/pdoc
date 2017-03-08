'use strict';

/**
 * The logger related code here.
 */


const config = require('../config/server.json');
const winston = require('winston');
const morgan = require('morgan');

const Logger = winston.Logger;
const File = winston.transports.File;

const logger = new Logger({
  transports: [
    new File({
      name: 'accessLog',
      filename: config.log.accessLogPath,
      level: 'info',
      json: false,
      timestamp: false,
      showLevel: false
    }),
    new File({
      name: 'errorLog',
      filename: config.log.errorLogPath,
      level: 'error',
      json: false,
      timestamp: true
    })
  ]
});
const logFormat = ':remote-addr - :remote-user [:date[clf]]' +
  ' ":method :url HTTP/:http-version"' +
  ' ":status/:res[content-length]/:response-time ms"' +
  ' ":referrer" ":user-agent"';

module.exports = function(app) {
  app.use(morgan(logFormat, {
    'stream': {
      write: (message, encoding) => {
        logger.info(message);
      }
    }
  }));
};
