//node-modules
const express = require('express');
const bodyParser = require('body-parser');

//proyect modules
const middleware = require('./middleware');
const usersRouter = require('./routers/usersRouter');

const port = process.env.PORT || 3000;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);


const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);