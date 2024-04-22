module.exports = function (router) {

    var productController = require('../controllers/ProductController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/product/list', verifyUser.isAuth, productController.getList)

    router.get('/product/detail/:id', verifyUser.isAuth, productController.getDetail)

    router.post('/product/add', verifyUser.isAuth, productController.createProduct)

    router.delete('/product/delete/:id', verifyUser.isAuth, productController.removeProduct)

    router.put('/product/update/:id', verifyUser.isAuth, productController.updateProduct)
}