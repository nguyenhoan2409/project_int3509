"use strict";

module.exports = function (router) {
  var userController = require('../controllers/UserControllers');
  var verifyUser = require('../middleware/AuthUser');
  router.get('/api/user/list', verifyUser.isAuth, userController.getUserList);
  router.get('/api/user/detail/:id', verifyUser.isAuth, userController.getUserDetail);
  router.get('/api/user/getMe', verifyUser.isAuth, userController.getMe);
  router["delete"]('/api/user/delete/:id', verifyUser.isAuth, userController.removeUser);
  router.put('/api/user/update', verifyUser.isAuth, userController.updateUser);
  router.get('/api/admin/statisticalData', verifyUser.isAuth, verifyUser.checkAdmin, userController.statisticaldata);
  router.patch('/api/user/user-to-admin/:id', verifyUser.isAuth, userController.userToAdmin);
  router.patch('/api/user/update/password', verifyUser.isAuth, userController.updatePassword);
  router.get('/api/user/:id/verify/:code', userController.verifyUser);
  router.post('/api/user/checkEmailForForgottenPassword', userController.checkEmailForForgottenPassword);
  router.get('/api/user/forgottenPassword/:id/verify/:code', userController.verifyUserForForgottenPassword);
  router.patch('/api/user/createNewPassword', userController.createNewPassword);
};