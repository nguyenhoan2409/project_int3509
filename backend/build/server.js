"use strict";

var express = require('express');
var dotenv = require('dotenv');
var moment = require('moment/moment');
var cors = require('cors');
var _require = require('./config/database'),
  database = _require.database;
var cookieParser = require('cookie-parser');
dotenv.config();
var app = express();
var port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
require('./routes/AccountRoutes')(app);
require('./routes/ProductRoutes')(app);
require('./routes/ScoreRoute')(app);
require('./routes/OrderRoutes')(app);
require('./routes/UserRoute')(app);
require('./routes/TimelineRoute')(app);
require('./routes/CertificateRoutes')(app);
require('./routes/NotificationRoutes')(app);
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(port, function () {
  console.log("App listening at http://localhost:".concat(port));
});