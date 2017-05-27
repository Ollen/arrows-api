const fs = require('fs');

// Middleware
const pathLogger = (req, res, next) => {
  let now = new Date();
  let filename = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`;
  var log = `${now.toUTCString()}: ${req.method} ${req.url}`;
  fs.appendFile(`./server/logs/${filename}.log`, log + '\n');  
  next();
};

// Function
const APILogger = (type, method, url, log) => {
  let now = new Date();
  let filename = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`;
  var mainLog = `${now.toUTCString()}: [${type}] ${method} ${url} \n${log}`;
  fs.appendFile(`./server/logs/${filename}.log`, mainLog + '\n');  
};

module.exports = {pathLogger, APILogger};