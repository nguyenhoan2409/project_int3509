const { getAllOrder, getRemainingProductQuantity, confirmOrderStatus, getOrderById, getOrderByStatus, confirmToReturnItem, createOrderForRentingOrBuying, createOrderForScheduling } = require("../controllers/OrderControllers")

module.exports = function (router) {
    router.get('/order/getAllOrder', getAllOrder); 
    router.get('/order/getOrderById/:order_id', getOrderById); 
    router.get('/order/getOrderByStatus/:status', getOrderByStatus); 
    router.get('/order/getRemainingProductQuantity/:product_id', getRemainingProductQuantity); 
    router.put('/order/confirmOrderStatus', confirmOrderStatus); 
    router.put('/order/confirmToReturnItem', confirmToReturnItem); 
    router.post('/order/createOrderForRentingOrBuying', createOrderForRentingOrBuying); 
    router.post('/order/createOrderForScheduling', createOrderForScheduling); 
}