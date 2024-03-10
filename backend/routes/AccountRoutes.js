module.exports = function (router) {

    var userController = require('../controllers/UserControllers')
    var JWT = require("../middleware/jwt")

    router.post('/login', userController.login)
    router.post('/register', userController.register)
}