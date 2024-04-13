module.exports = function (router) {

    var productController = require('../controllers/ProductController')
    var JWT = require("../middleware/jwt")

    router.get('/product/list', productController.get_list)

    router.get('/product/detail/:id', productController.detail)

    router.post('/product/add', productController.add_product)

    router.delete('/product/delete/:id', productController.remove_product)

    router.put('/product/update/:id', productController.update_product)
}