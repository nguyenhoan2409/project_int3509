"use strict";

module.exports = function (router) {
  var notificationController = require('../controllers/NotificationController');
  var verifyUser = require('../middleware/AuthUser');
  router.get('/api/home/notification', verifyUser.isAuth, notificationController.getNotificationList);
  router.get('/api/home/notification/:id', verifyUser.isAuth, notificationController.getNotificationDetail);
  router.post('/api/admin/notification/create', verifyUser.isAuth, notificationController.createNotification);
  router.put('/api/admin/notification/update', verifyUser.isAuth, notificationController.updateNotification);
};