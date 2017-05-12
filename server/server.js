/**
 * Author: Allendale S. Nato
 */

const express = require('express');
const MobileRouter = require('./routes/mobile');

const port = process.env.PORT || 3000;
var app = express();

app.use('/mobile', MobileRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});