require('dotenv').config();

const express = require('express');
require('express-async-errors');
const { json } = require('body-parser');
const cors = require('cors');

const NotFoundError = require('./errors/not-found-error');
const errorHandler = require('./middlewares/error-handler');

const echoRouter = require('./routes/echo');
const todoRouter = require('./routes/Todo/todo');
const app = express();

app.use(cors());
app.use(json());

app.use('/app/echo', echoRouter);
app.use('/app/no_auth', todoRouter);

app.all('*', () => {
  throw new NotFoundError('Page not found');
});

app.use(errorHandler);

module.exports = app;
