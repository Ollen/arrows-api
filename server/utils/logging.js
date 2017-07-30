const fs = require('fs');
/**
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
  fs.appendFile(`./server/logs/${filename}.log`, log + '\n');  
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
  fs.appendFile(`./server/logs/${filename}.log`, mainLog + '\n');  
};

module.exports = {pathLogger, APILogger};