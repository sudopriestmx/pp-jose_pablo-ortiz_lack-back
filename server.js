//node-modules
const express = require('express');
const bodyParser = require('body-parser');

//proyect modules
const middleware = require('./middleware');

const port = process.env.PORT || 3000;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);