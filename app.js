'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const config = require('config');
const path = require('path');

const app = express();

/* CONNECT TO MONGODB */
mongoose.connect(config.get('dbURL'));
mongoose.connection.on('open', () => console.log('connected to mongodb'));

/* MIDDLEWARE */
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* HANDLEBARS - VIEWS */
var viewsPath = path.join(__dirname, '/client/views');  
app.set('views', viewsPath);
var hbs = handlebars.create({
  defaultLayout: 'main',
  layoutsDir: viewsPath + '/layouts',
  partialsDir: viewsPath + '/partials'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* PUBLIC */
app.use('/public', express.static('client/public'));

/* ROUTES */
const rootRoutes = require('./api/routes/root.routes');
app.use('/', rootRoutes);

/* 404 - Not found */
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message} });
});

module.exports = app;

