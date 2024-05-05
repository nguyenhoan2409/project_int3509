module.exports = function (router) {

    var productController = require('../controllers/ProductController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/product/list', verifyUser.isAuth, productController.getProductList)

    router.get('/product/detail/:id', verifyUser.isAuth, productController.getProductDetail)

    router.post('/product/add', verifyUser.isAuth, productController.createProduct)

    router.delete('/product/delete/:id', verifyUser.isAuth, productController.removeProduct)

    router.put('/product/update/:id', verifyUser.isAuth, productController.updateProduct)
}