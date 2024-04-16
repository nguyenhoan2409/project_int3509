module.exports = function (router) {

    var userController = require('../controllers/UserControllers'); 
    var verifyUser = require('../middleware/AuthUser'); 
    var JWT = require("../middleware/jwt")

    router.get('/user/list', verifyUser.isAuth, userController.get_list)

    router.get('/user/detail/:id', verifyUser.isAuth, userController.userDetail)

    router.get('/user/getMe', verifyUser.isAuth, userController.getMe)

    router.delete('/user/delete/:id', verifyUser.isAuth, userController.remove_user)

    router.put('/user/update/:id', verifyUser.isAuth, userController.update_user)

    router.get('/admin/statisticalData', verifyUser.isAuth, verifyUser.checkAdmin, userController.statisticaldata)

}