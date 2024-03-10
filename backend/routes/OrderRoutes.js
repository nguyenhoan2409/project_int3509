const { getAllOrder, getRemainingProductQuantity, confirmOrder, createOrder } = require("../controllers/OrderControllers")

module.exports = function (router) {
    router.get('/order/all', getAllOrder); 
    router.get('/order/getRemainingProductQuantity/:product_id', getRemainingProductQuantity); 
    router.put('/order/confirmOrder', confirmOrder); 
    router.post('/order/createOrder', createOrder); 
}