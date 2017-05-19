const express = require('express');
const dbHandler = require('./../../utils/db_handler');
const router = express.Router();

router.get('/user', (req, res) => {
  dbHandler.findAllUsers()
    .then(users => {
      res.send(users);
    }).catch(err => {
      console.log(err);
      res.send('Error fetching express data');
    });
});

router.get('/driver', (req, res) => {
  dbHandler.findAllDrivers()
    .then(users => {
      res.send(users);
    }).catch(err => {
      console.log(err);
      res.send('Error fetching express data');
    });  
});


module.exports = router;