module.exports = function (router) {

    var userController = require('../controllers/UserControllers'); 
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/user/list', verifyUser.isAuth, userController.getUserList)

    router.get('/user/detail/:id', verifyUser.isAuth, userController.getUserDetail)

    router.get('/user/getMe', verifyUser.isAuth, userController.getMe)

    router.delete('/user/delete/:id', verifyUser.isAuth, userController.removeUser)

    router.put('/user/update', verifyUser.isAuth, userController.updateUser)

    router.get('/admin/statisticalData', verifyUser.isAuth, verifyUser.checkAdmin, userController.statisticaldata)

    router.patch('/user/user-to-admin/:id', verifyUser.isAuth, userController.userToAdmin)

    router.patch('/user/update/password', verifyUser.isAuth, userController.updatePassword)

    router.get('/user/:id/verify/:code', userController.verifyUser); 

}