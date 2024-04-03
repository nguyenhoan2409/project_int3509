module.exports = function (router) {

    var authController = require('../controllers/AuthController')
    var JWT = require("../middleware/jwt")

    router.post('/login', authController.login)
    router.post('/register', authController.register)
    router.delete('/logout', authController.logOut); 
}