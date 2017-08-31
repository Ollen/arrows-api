const fs = require('fs');
/**
 * @author Allendale Nato <natoallendale@gmail.com>
 * Server Logger
 * Logs all request activities and its corresponding level and message
 * in a .log file.
 */


/**
 * An Express Middleware that logs the URL and HTTP method
 * of an Express request Object.
 * 
 * @module
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const pathLogger = (req, res, next) => {
  let now = new Date();
  let filename = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`;
  var log = `${now.toUTCString()}: ${req.method} ${req.url}`;
  fs.appendFile(`./server/logs/${filename}.log`, log + '\n', err => {
    if (err) {
      console.log('Error logging data', err);
    }
  });  
  next();
};

/**
 * A function that logs the URL, HTTP method, log level, and message
 * of an Express request object.
 * 
 * @function
 * @param {String} type 
 * @param {String} method 
 * @param {String} url 
 * @param {String} log 
 */
const APILogger = (type, method, url, log) => {
  let now = new Date();
  let filename = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`;
  var mainLog = `${now.toUTCString()}: [${type}] ${method} ${url} \n${log}`;
  fs.appendFile(`./server/logs/${filename}.log`, mainLog + '\n', err => {
    if (err) {
      console.log('Error logging data', err);
    }
  });  
};

module.exports = {pathLogger, APILogger};