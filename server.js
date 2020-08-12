//node-modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

//proyect modules
const middleware = require('./middleware');
const usersRouter = require('./routers/usersRouter');
const authRouter = require('./routers/authRouter');
const mercadoPagoRouter = require('./routers/mercadoPagoRouter')

if (process.env.NODE_ENV !== 'production') dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/login', authRouter);
app.use('/users', usersRouter);
app.use('/mercadopago', mercadoPagoRouter)

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);


const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);