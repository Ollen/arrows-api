/**
 * Author: Allendale S. Nato <natoallendale@gmail.com>
 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const dbHandler = require('./../utils/db_handler');
var router = express.Router();

// GET /mobile
router.get('/', (req, res) => {
  var expressData = {};
  try {
    var rawJSON = fs.readFileSync('server/data/JSON1.json');
    expressData = JSON.parse(rawJSON);
  } catch (e) {
    console.error('[GET /mobile]Problem parsing JSON file');
  }
  res.json(expressData);
});

router.get('/test/user', (req, res) => {
  dbHandler.findAllUsers()
    .then(users => {
      res.send(users);
    }).catch(err => {
      console.log(err);
      res.send('Error fetching express data');
    });
});

// POST /mobile
router.use(bodyParser.text());
router.use(bodyParser.json());
// Handle JSON syntax error
router.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).send('Bad JSON');
  }
  next();
});

router.post('/', (req, res) => {
  if (req.is('application/json')) {
    return res.send(req.body);
  } else if (req.is('text/*')) {
    try {
      let rawJSON = req.body;
      let parsedJSON = JSON.parse(rawJSON);
      return res.send(parsedJSON);  
    } catch (e) {
      return res.status(400).send('Bad JSON');
    }
  }

  res.status(406).send('Invalid data type');
});

module.exports = router;