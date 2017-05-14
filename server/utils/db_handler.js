const db = require('./../db/database');

var getCurrentExpressData = () => {
  return db.user.findAll();
};

// Test purposes
var findAllUsers = () => {
  return db.user.findAll();
};

module.exports = {
  getCurrentExpressData,
  findAllUsers
};