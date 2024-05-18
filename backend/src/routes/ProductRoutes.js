module.exports = function (router) {

    var productController = require('../controllers/ProductController')
    var verifyUser = require('../middleware/AuthUser'); 

    router.get('/api/product/list', verifyUser.isAuth, productController.getProductList)

    router.get('/api/product/detail/:id', verifyUser.isAuth, productController.getProductDetail)

    router.post('/api/product/add', verifyUser.isAuth, productController.createProduct)

    router.delete('/api/product/delete/:id', verifyUser.isAuth, productController.removeProduct)

    router.put('/api/product/update/:id', verifyUser.isAuth, productController.updateProduct)
}