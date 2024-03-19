module.exports = function (router) {

    var userController = require('../controllers/UserControllers'); 
    var JWT = require("../middleware/jwt")

    router.get('/user/list', userController.get_list)

    router.get('/user/detail/:id', userController.userDetail)

    router.delete('/user/delete/:id', userController.remove_user)

    router.put('/user/update', userController.update_user)

    router.get('/token', async function(req, res) {
        var user = {
            email : "20020483@vnu.edu.vn",
            password : "123456"
        }
        const _token = await JWT.make(user)
        res.send({token: _token})
    })
}