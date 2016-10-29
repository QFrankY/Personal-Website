const express    = require('express');
const path       = require('path');
const session    = require('./config/sessions'); // The configured express-session object.
const bodyParser = require('body-parser');
const bluebird   = require('bluebird');

// const favicon = require('serve-favicon');
const app = express();

bluebird.config({
	warnings: false
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

module.exports = app;