module.exports = function (router) {

    var notificationController = require('../controllers/NotificationController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/home/notification', verifyUser.isAuth, notificationController.getNotificationList); 
    router.get('/home/notification/:id', verifyUser.isAuth, notificationController.getNotificationDetail); 
    router.post('/home/notification/create', verifyUser.isAuth, notificationController.createNotification); 
    router.patch('/home/notification/update', verifyUser.isAuth, notificationController.updateNotification); 
}