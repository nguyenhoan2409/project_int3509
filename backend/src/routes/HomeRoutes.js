module.exports = function (router) {
    var JWT = require("../middleware/jwt")

    const authController = require('../controllers/AuthController')
    router.get('/token', authController.getToken)
    router.get('/checktoken', authController.checkToken)
}