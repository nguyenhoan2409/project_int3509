"use strict";

module.exports = function (router) {
  var authController = require('../controllers/AuthController');
  var JWT = require("../middleware/jwt");
  router.post('/api/login', authController.login);
  router.post('/api/register', authController.register);
  router["delete"]('/api/logout', authController.logOut);
};