/**
 * Author: Allendale S. Nato <natoallendale@gmail.com>
 */

const express = require('express');
const bodyParser = require('body-parser');

const dbHandler = require('./../utils/db_handler');

// OPTIONAL: test
var testRouter = require('./tests/mobile_api_test');

var router = express.Router();

// OPTIONAL: test routers
router.use('/test', testRouter);

// GET /mobile
router.get('/', (req, res) => {
  dbHandler.getCurrentExpressData().then(arrowsJSON => {
    console.log(`SUCCESS [GET ${req.originalUrl}]: Fetched data correctly` );
    res.send({arrowsJSON});
  }).catch(err => {
    console.log(`ERROR [GET ${req.originalUrl}]: `, err);
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
    return res.status(400).send('Bad JSON');
  }
  next();
});

router.post('/', (req, res) => {
  if (req.is('application/json')) {
    dbHandler.updateExpressData(req.body).then(() => {
      console.log(`SUCCESS [POST ${req.originalUrl}]: Successful Update` );
      res.send();
    }).catch((e) => {
      console.log(`ERROR [POST ${req.originalUrl}]: Fail Update` );
      res.status(500).send(e);
    });
  } else if (req.is('text/*')) {
    try {
      let rawJSON = req.body;
      let parsedJSON = JSON.parse(rawJSON);
      dbHandler.updateExpressData(parsedJSON).then(() => {
        console.log(`SUCCESS [POST ${req.originalUrl}]: Successful Update` );
        res.send();
      }).catch((e) => {
        console.log(`ERROR [POST ${req.originalUrl}]: Fail Update` );
        res.status(500).send(e);
      });
    } catch (e) {
      return res.status(400).send('Bad JSON');
    }
  } else {
    res.status(406).send('Invalid data type');
  }

});

module.exports = router;