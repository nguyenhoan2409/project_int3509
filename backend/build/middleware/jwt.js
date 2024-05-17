"use strict";

var jwt = require("jsonwebtoken");
var app = require("./app");
var make = function make(user) {
  return new Promise(function (resolve, reject) {
    jwt.sign({
      data: user
    }, app.ACCESS_TOKEN, {
      algorithm: "HS256",
      expiresIn: app.TOKEN_TIMELIFE
    }, function (err, _token) {
      if (err) {
        return reject(err);
      } else {
        return resolve(_token);
      }
    });
  });
};
var check = function check(token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, app.ACCESS_TOKEN, function (err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};
module.exports = {
  make: make,
  check: check
};