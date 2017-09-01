/**
 * Author: Allendale S. Nato <natoallendale@gmail.com>
 */
const express = require('express');
const bodyParser = require('body-parser');

const dbHandler = require('./../utils/db_handler');
const {APILogger} = require('./../utils/logging');

// OPTIONAL: test
var testRouter = require('./tests/mobile_api_test');

var router = express.Router();

// OPTIONAL: test routers
router.use('/test', testRouter);

// GET /mobile
router.get('/', (req, res) => {
  dbHandler.getCurrentExpressData_alt().then(arrowsJSON => {
    APILogger('S', req.method, req.originalUrl, 'Fetch Successful' + '\n');
    res.send({arrowsJSON});
  }).catch(err => {
    APILogger('E', req.method, req.originalUrl, 'Fetch Unseuccessful: ' + err + '\n');
    res.status(500).send({
      msg: 'Error fetching data',
      code: '[500] Internal server error'
    });
  });
});

// POST /mobile
router.use(bodyParser.text());
router.use(bodyParser.json());
// Handle JSON syntax error
router.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    APILogger('W', req.method, req.originalUrl, 'Bad JSON Format' + '\n');
    return res.status(400).send('Bad JSON');
  }
  next();
});

router.post('/', (req, res) => {
  if (req.is('application/json')) {
    dbHandler.updateExpressData_alt(req.body).then((s) => {
      APILogger('S', req.method, req.originalUrl, 'Update Successful:' + s + '\n');
      res.send();
    }).catch((e) => {
      APILogger('E', req.method, req.originalUrl, 'Update Error: ' + e + '\n');
      res.status(500).send(e);
    });
  } else if (req.is('text/*')) {
    try {
      let rawJSON = req.body;
      let parsedJSON = JSON.parse(rawJSON);
      dbHandler.updateExpressData_alt(parsedJSON).then(() => {
        APILogger('S', req.method, req.originalUrl, 'Update Successful' + '\n');
        res.send();
      }).catch((e) => {
        APILogger('E', req.method, req.originalUrl, 'Update Error: ' + e + '\n');
        res.status(500).send(e);
      });
    } catch (e) {
      APILogger('E', req.method, req.originalUrl, 'Bad JSON Format' + '\n');
      return res.status(400).send('Bad JSON');
    }
  } else {
    APILogger('E', req.method, req.originalUrl, 'Invalid Data Type' + '\n');
    res.status(406).send('Invalid data type');
  }

});

module.exports = router;