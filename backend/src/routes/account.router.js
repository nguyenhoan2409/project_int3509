module.exports = function (router) {

    var userController = require('../controllers/user.controller')
    var JWT = require("../common/jwt")

    router.post('/login', userController.login)
    router.post('/register', userController.register)
}
