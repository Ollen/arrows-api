/**
 * @author Allendale S. Nato <natoallendale@gmail.com>
 */

const express = require('express');
const {pathLogger} = require('./utils/logging');
const MobileAPIRouter = require('./routes/mobile_api');

const port = process.env.PORT || 3000;
var app = express();

app.use(pathLogger);
app.use('/arrows/mobile/api', MobileAPIRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});