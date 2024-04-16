module.exports = function (router) {

    var productController = require('../controllers/ProductController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/product/list', verifyUser.isAuth, productController.get_list)

    router.get('/product/detail/:id', verifyUser.isAuth, productController.detail)

    router.post('/product/add', verifyUser.isAuth, productController.add_product)

    router.delete('/product/delete/:id', verifyUser.isAuth, productController.remove_product)

    router.put('/product/update/:id', verifyUser.isAuth, productController.update_product)
}