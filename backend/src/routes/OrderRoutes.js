const { getAllOrder, getRemainingProductQuantity, confirmOrderStatus, getOrderById, getOrderByStatus, createOrder } = require("../controllers/OrderControllers")

module.exports = function (router) {
    router.get('/order/getAllOrder', getAllOrder); 
    router.get('/order/getOrderById/:order_id', getOrderById); 
    router.get('/order/getOrderByStatus/:status', getOrderByStatus); 
    router.get('/order/getRemainingProductQuantity/:product_id', getRemainingProductQuantity); 
    router.put('/order/confirmOrderStatus', confirmOrderStatus);  
    router.post('/order/createOrder', createOrder); 
}